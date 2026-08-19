'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Envelope, X } from '@phosphor-icons/react';
import { groups, type Screen } from '../../data/yobulu-screens';

function ImageLightbox({ image, onClose }: { image: { src: string; alt: string } | null; onClose: () => void }) {
  if (!image) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6 cursor-zoom-out"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-lg"
      >
        <X size={18} weight="bold" />
      </button>
      <div
        className="flex flex-col items-center max-w-[92vw] max-h-[92vh] bg-neutral-50 rounded-2xl shadow-2xl p-4 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[80vh] object-contain rounded-lg select-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
        <p className="mt-3 text-center text-sm font-medium text-neutral-700">{image.alt}</p>
      </div>
    </div>
  );
}

/**
 * Product surface, presented the way Recess does it: the screen sits inside a
 * padded panel rather than bleeding to the edges, with its caption centered
 * underneath instead of laid over the image. Two per row.
 */
function Surface({ item, onSelect }: { item: Screen; onSelect: (image: { src: string; alt: string }) => void }) {
  return (
    <figure>
      {item.src ? (
        <div
          className="rounded-lg border border-border bg-secondary p-4 flex items-center justify-center overflow-hidden cursor-zoom-in"
          style={{ aspectRatio: '4 / 3' }}
          onClick={() => onSelect({ src: item.src as string, alt: item.title })}
        >
          <img
            src={item.src}
            alt={item.title}
            className="max-w-full max-h-full object-contain select-none"
            loading="lazy"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      ) : (
        <div
          className="rounded-lg border border-dashed border-border bg-secondary p-4 flex items-center justify-center"
          style={{ aspectRatio: '4 / 3' }}
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/50 text-center">
            {item.title}
          </p>
        </div>
      )}
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        {item.title}
      </figcaption>
    </figure>
  );
}

function CTASection() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      ref={sectionRef}
      className="relative my-12 bg-foreground text-background rounded-xl overflow-hidden border border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="px-8 py-10 relative">
        <Envelope size={160} weight="light" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10" />
        <h3 className="text-xl font-semibold mb-2">Building something ambitious?</h3>
        <p className="text-sm text-background/60 leading-relaxed max-w-md">
          Whether you&apos;re launching from scratch or refining an existing product, I&apos;d love to hear what you&apos;re working on.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
            x: mousePos.x - 48,
            y: mousePos.y - 48,
          }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute left-0 top-0 w-24 h-24 rounded-full bg-white text-foreground flex items-center justify-center text-sm font-medium shadow-lg"
        >
          <a href="mailto:miichealovie33@gmail.com" className="w-full h-full rounded-full flex items-center justify-center">Send a Mail</a>
        </motion.div>
      </div>
    </section>
  );
}

export function YobuluCaseStudy() {
  const [activeHeading, setActiveHeading] = useState('');
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    document.querySelectorAll('.bg-content section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const tocItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'screens', label: 'Selected Screens' },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-12">
        <aside className="hidden lg:block w-64 shrink-0">
          <nav className="sticky top-12">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} weight="bold" />
              Back to home
            </Link>
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Contents</h3>
            <ul className="space-y-3">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`text-sm transition-colors block leading-snug ${
                      activeHeading === item.id
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 max-w-2xl">
          <div className="bg-content">
            {/* Header */}
            <header className="mb-12">
              <Link
                href="/"
                className="lg:hidden flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft size={16} weight="bold" />
                Back to home
              </Link>

              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                <Calendar size={14} weight="bold" />
                2025
              </div>

              <h1 className="text-3xl font-semibold mb-4">
                Yobulu: Designing an Experimental Financial Platform
              </h1>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">product design</span>
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">fintech</span>
                <span className="inline-flex items-center gap-1.5 bg-secondary text-muted-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />Unlaunched
                </span>
              </div>
            </header>

            {/* Overview */}
            <section id="overview" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">Overview</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Yobulu is an experimental financial platform exploring what it could feel like to have different financial products and markets in one place. The concept brings together CFD trading, crypto, stocks, event-based bets, banking, and virtual cards into a single experience.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I designed most of the product from the ground up, exploring how these different financial experiences could coexist within one product while still feeling familiar, simple, and consistent. Although the product was intended to be built, it ultimately never launched.
              </p>
            </section>

            {/* Selected Screens */}
            <section id="screens" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">Selected Screens</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A collection of product surfaces designed across the Yobulu ecosystem, from investing and trading to everyday banking and payments.
              </p>

              {groups.map((group) => (
                <div key={group.id} className="my-10">
                  <h3 className="text-base font-semibold mb-4">{group.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
                    {group.screens.map((screen) => (
                      <Surface key={screen.title} item={screen} onSelect={setLightbox} />
                    ))}
                  </div>
                </div>
              ))}

              <p className="text-muted-foreground leading-relaxed">
                Yobulu was an opportunity to explore how multiple financial experiences could come together within a single product ecosystem through one cohesive design language.
              </p>
            </section>

            {/* CTA */}
            <CTASection />

            {/* Footer */}
            <footer className="py-6 border-t border-border mt-8">
              <p className="text-xs text-muted-foreground text-center">
                Case study: Yobulu, 2025
              </p>
            </footer>
          </div>
        </main>
      </div>
      <ImageLightbox image={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}
