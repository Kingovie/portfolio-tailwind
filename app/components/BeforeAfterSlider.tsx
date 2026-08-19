'use client';

import React, { useCallback, useRef, useState } from 'react';
import { ArrowsLeftRight, CaretLeft, CaretRight } from '@phosphor-icons/react';

interface BeforeAfterSliderProps {
  title: string;
  caption: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  /** width / height, e.g. 1702 / 1105 */
  aspectRatio: number;
  onPrev?: () => void;
  onNext?: () => void;
  pageIndicator?: { current: number; total: number };
  /** Called with whichever image (before or after) is currently on top when the user clicks the slider. */
  onImageClick?: (src: string, alt: string) => void;
}

export function BeforeAfterSlider({
  title,
  caption,
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  aspectRatio,
  onPrev,
  onNext,
  pageIndicator,
  onImageClick,
}: BeforeAfterSliderProps) {
  const [pct, setPct] = useState(100);
  const draggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPct((p) => Math.max(0, p - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPct((p) => Math.min(100, p + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPct(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPct(100);
    }
  };

  const showingBefore = pct >= 50;

  return (
    <div
      ref={containerRef}
      className={`relative rounded-lg overflow-hidden border border-border my-8 bg-secondary select-none touch-none ${onImageClick ? 'cursor-zoom-in' : ''}`}
      style={{ aspectRatio }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onClick={() => onImageClick?.(showingBefore ? beforeSrc : afterSrc, showingBefore ? beforeAlt : afterAlt)}
    >
      {/* after — full underlying layer */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-contain object-top pointer-events-none select-none"
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* before — clipped to slider position; opaque bg so the after layer can't bleed through the gap left by object-contain */}
      <div className="absolute inset-0 overflow-hidden bg-white" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-contain object-top pointer-events-none select-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      {/* divider + drag handle */}
      <div
        className="absolute inset-y-0 -translate-x-1/2 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)] pointer-events-none"
        style={{ left: `${pct}%` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison slider"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-purple-500 border-2 border-white shadow-lg flex items-center justify-center cursor-ew-resize touch-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2"
        style={{ left: `${pct}%` }}
      >
        <ArrowsLeftRight size={16} weight="bold" className="text-white" />
      </div>

      {/* prev/next page navigation */}
      {onPrev && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/15 hover:bg-black/30 text-white flex items-center justify-center transition-colors"
        >
          <CaretLeft size={16} weight="bold" />
        </button>
      )}
      {onNext && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/15 hover:bg-black/30 text-white flex items-center justify-center transition-colors"
        >
          <CaretRight size={16} weight="bold" />
        </button>
      )}

      {/* page dots */}
      {pageIndicator && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 text-white text-xs font-medium">
          {Array.from({ length: pageIndicator.total }).map((_, i) => (
            <span key={i} className={i === pageIndicator.current ? 'text-white' : 'text-white/40'}>
              &#x2022;
            </span>
          ))}
        </div>
      )}

      {/* caption + before/after tab, matching the "visit live product" treatment */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end justify-between">
        <div className="pointer-events-none">
          <p className="text-sm font-medium text-white/90">{title}</p>
          <p className="text-xs text-white/70">{caption}</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm p-1 shrink-0">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setPct(100); }}
            className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors ${
              showingBefore ? 'bg-white text-neutral-900' : 'text-white hover:bg-white/20'
            }`}
          >
            before
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setPct(0); }}
            className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors ${
              !showingBefore ? 'bg-white text-neutral-900' : 'text-white hover:bg-white/20'
            }`}
          >
            after
          </button>
        </div>
      </div>
    </div>
  );
}
