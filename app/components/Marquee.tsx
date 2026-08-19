"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "@phosphor-icons/react";

export interface MarqueeItem {
  src: string;
  caption: string;
  /** Screens too tall to show statically (e.g. a scrollable results list):
   * a real screen-recording of the Figma prototype, already framed and
   * looping, dropped in place of the still image. */
  video?: { mp4: string; webm?: string; poster?: string };
}

// Mockups arrive with their own device frame baked into the image, so we just
// place them — no synthetic frame, and object-contain so nothing gets cropped.
function Shot({ src, caption, sizes }: { src: string; caption: string; sizes: string }) {
  return (
    <div className="marquee-shot">
      <Image src={src} alt={caption} fill className="object-contain" sizes={sizes} />
    </div>
  );
}

function VideoShot({ video, caption }: { video: NonNullable<MarqueeItem["video"]>; caption: string }) {
  return (
    <div className="marquee-shot">
      <video
        className="marquee-shot-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={video.poster}
        aria-label={caption}
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        <source src={video.mp4} type="video/mp4" />
      </video>
    </div>
  );
}

// The lightbox needs a much larger render of the same file, which is a fresh
// request the browser hasn't cached yet — so there'd otherwise be a blank gap
// while it loads. We layer the already-cached strip-thumbnail version
// underneath (same "260px" sizes as the strip, so it's an instant cache hit,
// just blown up and blurred) and cross-fade the sharp version in on top once
// it's actually loaded.
function LightboxShot({ src, caption }: { src: string; caption: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="marquee-shot">
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        className="object-contain marquee-shot-placeholder"
        sizes="260px"
      />
      <Image
        src={src}
        alt={caption}
        fill
        className={`object-contain marquee-shot-full ${loaded ? "is-loaded" : ""}`}
        sizes="90vh"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export function Marquee({
  items,
  label,
  speed = 42,
  reverse = false,
}: {
  items: MarqueeItem[];
  label?: string;
  speed?: number;
  reverse?: boolean;
}) {
  const [selected, setSelected] = useState<MarqueeItem | null>(null);
  const [dragging, setDragging] = useState(false);
  const track = [...items, ...items];

  const wrapRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  // Auto-scroll drives `scrollLeft` directly (not a CSS transform) so native
  // drag/touch/wheel scrolling and the ambient animation share one
  // mechanism instead of fighting each other. One full loop takes `speed`
  // seconds; it wraps seamlessly since the track is the items doubled.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf: number;
    let last = performance.now();

    // Reverse marquees count down from scrollLeft, but the browser clamps
    // scrollLeft at 0 — starting there leaves no room to decrement, so a
    // reverse marquee would sit frozen forever. Starting at the midpoint
    // gives it a full half-track to count down before wrapping.
    if (reverse) el.scrollLeft = el.scrollWidth / 2;

    function tick(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current && !draggingRef.current && el) {
        const half = el.scrollWidth / 2;
        const pxPerSec = half / speed;
        // Compute the wrapped position before writing it, rather than
        // reading el.scrollLeft back after assignment — the browser silently
        // clamps scrollLeft to >= 0, which would otherwise mask every
        // negative step and prevent the wrap-to-`half` check from ever firing.
        let next = el.scrollLeft + (reverse ? -1 : 1) * pxPerSec * dt;
        if (next >= half) next -= half;
        if (next < 0) next += half;
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, reverse, items.length]);

  // Pointer capture is deferred until real movement is detected — capturing
  // immediately on pointerdown (even for a plain click with zero movement)
  // suppresses the browser's native click event in most engines, which was
  // silently swallowing every tap on a mockup.
  const pointerIdRef = useRef<number | null>(null);

  function onPointerDown(e: React.PointerEvent) {
    const el = wrapRef.current;
    if (!el) return;
    movedRef.current = false;
    startXRef.current = e.clientX;
    startScrollRef.current = el.scrollLeft;
    pointerIdRef.current = e.pointerId;
  }
  function onPointerMove(e: React.PointerEvent) {
    const el = wrapRef.current;
    if (!el || pointerIdRef.current !== e.pointerId) return;
    const dx = e.clientX - startXRef.current;
    if (!draggingRef.current) {
      if (Math.abs(dx) <= 4) return;
      draggingRef.current = true;
      movedRef.current = true;
      setDragging(true);
      el.setPointerCapture(e.pointerId);
    }
    el.scrollLeft = startScrollRef.current - dx;
  }
  function endDrag() {
    pointerIdRef.current = null;
    draggingRef.current = false;
    setDragging(false);
  }

  return (
    <div className="marquee-bleed my-10" data-nav-fade>
      {label && (
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
      )}
      <div
        ref={wrapRef}
        className={`marquee-wrap ${dragging ? "marquee-wrap-dragging" : ""}`}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
          endDrag();
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="marquee-track">
          {track.map((item, i) => (
            <button
              key={i}
              type="button"
              aria-label={`View ${item.caption} full size`}
              className="marquee-item"
              onClick={() => {
                if (movedRef.current) return;
                setSelected(item);
              }}
            >
              {/* Strip always shows the still frame — the video only plays
                  once you click through to the lightbox. */}
              <Shot src={item.src} caption={item.caption} sizes="260px" />
              <span className="marquee-caption">{item.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="marquee-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="marquee-lightbox-close"
            onClick={() => setSelected(null)}
          >
            <X size={20} weight="bold" />
          </button>
          <div className="marquee-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div
              className={`marquee-lightbox-panel ${selected.video ? "marquee-lightbox-panel-video" : ""}`}
            >
              <div
                className={`marquee-lightbox-shot ${selected.video ? "marquee-lightbox-shot-video" : ""}`}
              >
                {selected.video ? (
                  <VideoShot video={selected.video} caption={selected.caption} />
                ) : (
                  <LightboxShot src={selected.src} caption={selected.caption} />
                )}
              </div>
              <p className="mt-6 text-center font-mono text-xs uppercase tracking-widest text-[hsl(240_6%_40%)]">
                {selected.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
