'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, Envelope, X } from '@phosphor-icons/react';
import { BeforeAfterSlider } from '../../components/BeforeAfterSlider';

function FeatureCard({ title, children, tag }: { title: string; children: React.ReactNode; tag?: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-primary" />
        {title}
        {tag && <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">{tag}</span>}
      </h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

interface LightboxImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

function FlowStep({ title, caption, src, alt, width, height, onClick }: { title: string; caption: string; src: string; alt: string; width: number; height: number; onClick: () => void }) {
  return (
    <div className="relative rounded-lg overflow-hidden border border-border my-6 bg-secondary cursor-zoom-in" onClick={onClick}>
      <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto select-none" sizes="(min-width: 1024px) 672px, 100vw" loading="lazy" draggable={false} onContextMenu={(e) => e.preventDefault()} />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <p className="text-sm font-medium text-white/90">{title}</p>
        <p className="text-xs text-white/70">{caption}</p>
      </div>
    </div>
  );
}

function ImageLightbox({ image, onClose }: { image: LightboxImage | null; onClose: () => void }) {
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
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width ?? 1600}
          height={image.height ?? 1150}
          className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg select-none"
          sizes="92vw"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <p className="mt-3 text-center text-sm font-medium text-neutral-700">{image.alt}</p>
      </div>
    </div>
  );
}

function ImagePlaceholder({ label, caption }: { label: string; caption?: string }) {
  return (
    <div
      className="relative rounded-lg overflow-hidden border border-border bg-secondary my-8"
      style={{ aspectRatio: '16/9', maxHeight: '500px' }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-center px-4">
        <div>
          <p className="text-sm font-medium">{label}</p>
          {caption && <p className="text-xs text-muted-foreground/70 mt-1">{caption}</p>}
        </div>
      </div>
    </div>
  );
}

function BlockQuote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <div className="my-6 p-5 bg-secondary/50 border-l-4 border-primary rounded-r-lg">
      <p className="text-foreground italic text-base leading-relaxed">"{children}"</p>
      {author && <p className="text-xs text-muted-foreground mt-2 font-normal not-italic">— {author}</p>}
    </div>
  );
}

function PMQuote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <div className="my-8 p-6 bg-card border border-border/60 rounded-xl shadow-sm">
      <svg className="text-muted-foreground/20 mb-2" width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
        <path d="M6.5 0C5.5 0 4.5 0.5 3.5 1.5L0 5.5V10.5H5V18H12V10.5L8.5 1.5C7.5 0.5 6.5 0 6.5 0ZM17.5 0C16.5 0 15.5 0.5 14.5 1.5L11 5.5V10.5H16V18H23V10.5L19.5 1.5C18.5 0.5 17.5 0 17.5 0Z" fill="currentColor"/>
      </svg>
      <p className="text-foreground text-base leading-relaxed italic font-serif mb-4">"{children}"</p>
      {author && (
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center text-[10px] font-semibold text-foreground/60 shrink-0">PM</span>
          <span className="text-xs text-muted-foreground">{author}</span>
        </div>
      )}
    </div>
  );
}

function InsightCard({ value, label, highlighted }: { value: string; label: string; highlighted?: boolean }) {
  return (
    <div className={`bg-card border rounded-lg p-5 text-center ${highlighted ? 'border-primary/30 bg-primary/5' : 'border-border'}`}>
      <div className={`text-2xl font-bold mb-1 ${highlighted ? 'text-primary' : 'text-foreground'}`}>{value}</div>
      <div className="text-xs text-muted-foreground leading-snug">{label}</div>
    </div>
  );
}

function LearningItem({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="font-serif text-lg text-muted-foreground shrink-0 w-5 pt-0.5">{number}</span>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

function CTASection() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
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

export function CribstockCaseStudy() {
  const [activeHeading, setActiveHeading] = useState('');
  const [dashboardIndex, setDashboardIndex] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const dashboardSlides = [
    {
      platform: 'Web',
      title: 'Investor Dashboard — Desktop',
      beforeSrc: '/projects/cribstock-dashboard-before.png',
      afterSrc: '/projects/cribstock-dashboard-after.png',
      beforeAlt: 'Investor dashboard before redesign — desktop',
      afterAlt: 'Investor dashboard after redesign — desktop',
      aspectRatio: 12420 / 8928,
    },
    {
      platform: 'Mobile',
      title: 'Investor Dashboard — Mobile',
      beforeSrc: '/projects/cribstock-mobile-before.png',
      afterSrc: '/projects/cribstock-mobile-after.png',
      beforeAlt: 'Investor dashboard before redesign — mobile',
      afterAlt: 'Investor dashboard after redesign — mobile',
      aspectRatio: 12420 / 8928,
    },
  ];

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
    { id: 'context', label: 'The Context' },
    { id: 'problem', label: 'The Problem' },
    { id: 'dashboard', label: 'The Investor Dashboard' },
    { id: 'purchase-flow', label: 'Purchase Flow' },
    { id: 'presale-tracker', label: 'Presale Tracker' },
    { id: 'upcoming-presales', label: 'Upcoming Presales' },
    { id: 'co-ownership', label: 'Co-ownership & Rental' },
    { id: 'process', label: 'The Process' },
    { id: 'impact', label: 'The Impact' },
    { id: 'learnings', label: 'Takeaways' },
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
                2023-2024
              </div>

              <h1 className="text-3xl font-semibold mb-4">
                Making property investment feel possible — and urgent
              </h1>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">product design</span>
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">revamp</span>
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">fintech · proptech</span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Shipped</span>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed">
                Cribstock lets everyday Nigerians co-own properties and earn rental income from their phones. I joined to revamp what existed and introduce features that didn't. The result? A sell-out.
              </p>
              <a href="https://cribstock.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mt-3 underline underline-offset-4">
                View live product <ArrowUpRight size={14} weight="bold" />
              </a>
            </header>

            {/* Quick Facts */}
            <div className="grid grid-cols-4 gap-4 my-8 p-5 bg-card border border-border rounded-lg">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Role</div>
                <div className="text-sm font-medium">Product designer</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Platform</div>
                <div className="text-sm font-medium">Web · iOS · Android</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Team</div>
                <div className="text-sm font-medium">2 PMs · 6 engineers</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Scope</div>
                <div className="text-sm font-medium">Revamp + new features</div>
              </div>
            </div>

            {/* The Context */}
            <section id="context" className="my-14">
              <p className="text-sm text-muted-foreground italic font-serif mb-1">The context</p>
              <h2 className="text-xl font-semibold mb-4">Cribstock was already live. But something wasn't clicking.</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                In Nigeria, property ownership has always felt like something that happens to other people. The prices are high, the process is opaque, and for most working people the entry point simply doesn't exist. Cribstock was built to change that. You could own a fraction of a real property, earn rental income paid directly to your wallet, and start from as little as ₦20,000.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The product was working. But when I joined, users were dropping off mid-purchase, the investor dashboard told you very little about what was happening with your money, and there was zero way to know what deals were coming or to follow a presale as it played out. I was brought in to fix all of that.
              </p>
            </section>

            {/* The Problem */}
            <section id="problem" className="my-14">
              <p className="text-sm text-muted-foreground italic font-serif mb-1">The problem</p>
              <h2 className="text-xl font-semibold mb-4">Imagine being a first-time property investor.</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                You've never owned real estate before. You're being asked to put your money into a building you've never set foot in, trusting that the returns will come. The app doesn't show you how close the deal is to selling out. You can't see what's coming next month. And the investor dashboard, which is supposed to be the thing that makes you feel in control, doesn't really show you much at all.
              </p>

              <BlockQuote>
                You sign up. You browse a property. You start the purchase flow. Something confuses you halfway through and you leave. You never come back.
              </BlockQuote>

              <p className="text-muted-foreground leading-relaxed">
                That was the loop Cribstock was stuck in. Drop-offs in the purchase flow. Low urgency around presales. A dashboard that wasn't earning trust. I had to fix the existing experience and then design the features that were missing entirely.
              </p>
            </section>

            {/* What I worked on */}
            <section id="dashboard" className="my-14">
              <p className="text-sm text-muted-foreground italic font-serif mb-1">What I worked on</p>
              <h2 className="text-xl font-semibold mb-6">Four areas. Two revamps, three new features.</h2>

              <h3 className="text-lg font-semibold mt-8 mb-3">01 — The investor dashboard</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The existing investor dashboard was there but it wasn't doing its job. Investors couldn't quickly understand their portfolio value, what income they had received, or what their wallet was doing. I redesigned it around what investors actually need to feel in control: value at a glance, income received, wallet activity. Clear hierarchy. No clutter.
              </p>

              <div className="inline-flex items-center gap-1 rounded-full bg-secondary p-1 border border-border">
                {dashboardSlides.map((slide, i) => (
                  <button
                    key={slide.platform}
                    type="button"
                    onClick={() => setDashboardIndex(i)}
                    className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors ${
                      dashboardIndex === i ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {slide.platform}
                  </button>
                ))}
              </div>

              <BeforeAfterSlider
                key={dashboardIndex}
                title={dashboardSlides[dashboardIndex].title}
                caption="Drag to compare, or tap before / after"
                beforeSrc={dashboardSlides[dashboardIndex].beforeSrc}
                afterSrc={dashboardSlides[dashboardIndex].afterSrc}
                beforeAlt={dashboardSlides[dashboardIndex].beforeAlt}
                afterAlt={dashboardSlides[dashboardIndex].afterAlt}
                aspectRatio={dashboardSlides[dashboardIndex].aspectRatio}
                onImageClick={(src, alt) => setLightbox({ src, alt })}
              />

              <h3 className="text-lg font-semibold mt-8 mb-3">02 — The property purchase flow</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Buying a property share had too many steps, too much jargon, and not enough reassurance along the way. I stripped it back. I made the pricing concrete, the returns tangible, and the steps feel like something a person designed rather than a compliance checklist.
              </p>

              <FlowStep
                title="Browse properties"
                caption="Top stocks, ongoing presales, or upcoming deals — all from one Invest view."
                src="/projects/cribstock-purchase-flow/step-01-browse.png"
                alt="Invest tab showing top stock listings"
                width={12420}
                height={8928}
                onClick={() => setLightbox({ src: '/projects/cribstock-purchase-flow/step-01-browse.png', alt: 'Invest tab showing top stock listings', width: 12420, height: 8928 })}
              />
              <FlowStep
                title="Filter to ongoing presales"
                caption="Days-left counters and live progress bars surface urgency without saying a word."
                src="/projects/cribstock-purchase-flow/step-02-filter-presale.png"
                alt="Invest tab filtered to ongoing presales"
                width={12420}
                height={8928}
                onClick={() => setLightbox({ src: '/projects/cribstock-purchase-flow/step-02-filter-presale.png', alt: 'Invest tab filtered to ongoing presales', width: 12420, height: 8928 })}
              />
              <FlowStep
                title="Property detail"
                caption="Deal type, estimated returns, and liquidation timeline — the numbers a buyer actually needs."
                src="/projects/cribstock-purchase-flow/step-03-property-detail.png"
                alt="Covet Estate property detail page"
                width={12420}
                height={8928}
                onClick={() => setLightbox({ src: '/projects/cribstock-purchase-flow/step-03-property-detail.png', alt: 'Covet Estate property detail page', width: 12420, height: 8928 })}
              />
              <FlowStep
                title="Buy shares"
                caption="Unit count, payout estimate, and exit timeline in one focused modal before committing."
                src="/projects/cribstock-purchase-flow/step-04-buy-modal.png"
                alt="Buy Covet Estate modal"
                width={12420}
                height={8928}
                onClick={() => setLightbox({ src: '/projects/cribstock-purchase-flow/step-04-buy-modal.png', alt: 'Buy Covet Estate modal', width: 12420, height: 8928 })}
              />
              <FlowStep
                title="Purchase confirmed"
                caption="Instant confirmation with a direct link to the new asset in your portfolio."
                src="/projects/cribstock-purchase-flow/step-05-purchase-confirmed.png"
                alt="Shares purchased confirmation"
                width={12420}
                height={8928}
                onClick={() => setLightbox({ src: '/projects/cribstock-purchase-flow/step-05-purchase-confirmed.png', alt: 'Shares purchased confirmation', width: 12420, height: 8928 })}
              />

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Drop-offs fell by 30% after the redesign shipped.
              </p>
            </section>

            <section id="presale-tracker" className="my-14">
              <h3 className="text-lg font-semibold mt-8 mb-3">
                03 — The presale tracker
                <span className="inline-flex items-center ml-2 bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider align-middle">New</span>
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                This one didn't exist before I joined. There was no way for an investor to see a presale unfolding in real time, how many shares had sold, how many were left, how close a property was to fully funded. I introduced a live progress tracker for each listing. Shares sold. Shares remaining. A counter that moves.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                What I didn't fully anticipate was the psychological effect. When you can see a number going down, you don't want to wait. Investors started feeling urgency they hadn't felt before. Not manufactured urgency, just the honest reality of limited supply made visible.
              </p>

              <PMQuote author="Product Manager, Cribstock">
                For the first time, we were able to sell out our new property stock quicker and faster. The revamp brought a kind of urgency to investors — they needed to hurry so they didn't miss out.
              </PMQuote>

              <div
                className="relative rounded-lg overflow-hidden border border-border my-8 bg-secondary cursor-zoom-in"
                onClick={() => setLightbox({ src: '/projects/Presale tracker.png', alt: 'Presale tracker', width: 6000, height: 3148 })}
              >
                <Image src="/projects/Presale tracker.png" alt="Presale tracker" width={6000} height={3148} className="w-full h-auto select-none" sizes="(min-width: 1024px) 672px, 100vw" loading="lazy" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-sm font-medium text-white/90">Presale Tracker</p>
                  <p className="text-xs text-white/70">Live counter, progress bar, and remaining shares</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Properties started selling out 80% faster. That's not a conversion tweak. That's a behaviour change.
              </p>
            </section>

            <section id="upcoming-presales" className="my-14">
              <h3 className="text-lg font-semibold mt-8 mb-3">
                04 — Upcoming presales page
                <span className="inline-flex items-center ml-2 bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider align-middle">New</span>
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                If investors didn't know what was coming, they had no reason to stay ready. I designed a dedicated upcoming deals page showing future presales before they open, with the property details, deal valuation, and launch date visible. The goal was simple: let investors make up their mind before the clock starts. So when a presale drops, they're not deciding. They're acting.
              </p>

              <div
                className="relative rounded-lg overflow-hidden border border-border my-8 bg-secondary cursor-zoom-in"
                onClick={() => setLightbox({ src: '/projects/Upcoming presale.png', alt: 'Upcoming presales page', width: 9284, height: 6871 })}
              >
                <Image src="/projects/Upcoming presale.png" alt="Upcoming presales page" width={9284} height={6871} className="w-full h-auto select-none" sizes="(min-width: 1024px) 672px, 100vw" loading="lazy" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-sm font-medium text-white/90">Upcoming Presales</p>
                  <p className="text-xs text-white/70">Deal cards, valuations, and launch dates at a glance</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                This contributed to the 50% increase in conversions. The decision was already made before the deal went live.
              </p>
            </section>

            <section id="co-ownership" className="my-14">
              <h3 className="text-lg font-semibold mt-8 mb-3">
                05 — Co-ownership & rental pages
                <span className="inline-flex items-center ml-2 bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider align-middle">New</span>
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Cribstock offers two products: co-ownership (long-term appreciation) and rental (monthly cashflow). Neither had a page that actually explained what the deal was. I designed new website pages for both. The co-ownership page covers shareholding structure, property valuation, and exit timeline. The rental page covers income rate, payout schedule, and occupancy status. The kind of information that turns "maybe" into "yes."
              </p>

              <div className="my-6 space-y-6">
                <div
                  className="relative rounded-lg overflow-hidden border border-border bg-secondary cursor-zoom-in"
                  onClick={() => setLightbox({ src: '/projects/Co-ownership.png', alt: 'Co-ownership page', width: 6000, height: 4313 })}
                >
                  <Image src="/projects/Co-ownership.png" alt="Co-ownership page" width={6000} height={4313} className="w-full h-auto select-none" sizes="(min-width: 1024px) 672px, 100vw" loading="lazy" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/90">Co-ownership Page</p>
                      <p className="text-xs text-white/70">Shareholding, valuation, exit timeline</p>
                    </div>
                    <a href="https://cribstock.com/" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-xs font-semibold uppercase tracking-wider text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors shrink-0 flex items-center gap-1.5">
                      Visit live product <ArrowUpRight size={14} weight="bold" />
                    </a>
                  </div>
                </div>
                <div
                  className="relative rounded-lg overflow-hidden border border-border bg-secondary cursor-zoom-in"
                  onClick={() => setLightbox({ src: '/projects/Rental deal.png', alt: 'Rental detail page', width: 6000, height: 4313 })}
                >
                  <Image src="/projects/Rental deal.png" alt="Rental detail page" width={6000} height={4313} className="w-full h-auto select-none" sizes="(min-width: 1024px) 672px, 100vw" loading="lazy" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/90">Rental Detail Page</p>
                      <p className="text-xs text-white/70">Income rate, payout cadence, occupancy</p>
                    </div>
                    <a href="https://cribstock.com/" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-xs font-semibold uppercase tracking-wider text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors shrink-0 flex items-center gap-1.5">
                      Visit live product <ArrowUpRight size={14} weight="bold" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* The Process */}
            <section id="process" className="my-14">
              <p className="text-sm text-muted-foreground italic font-serif mb-1">The process</p>
              <h2 className="text-xl font-semibold mb-4">I tested with real investors, not imagined ones.</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Every decision I made was informed by watching people who had never bought a property share try to do it. Not tech-savvy early adopters but working professionals who needed to feel confident handing over real money for something they had never done before. Their hesitation and confusion told me exactly what to fix. Their relief when something worked told me I was on the right track.
              </p>

              <BlockQuote author="Cribstock user, via TechCabal">
                I never thought I would be able to own a property especially in Lagos because of the high costs — Cribstock gave me that opportunity.
              </BlockQuote>

              <p className="text-muted-foreground leading-relaxed">
                I worked with 2 PMs and 6 engineers across all of this. 50+ design specs shipped at 98% accuracy, which meant engineers almost never needed to come back with clarifying questions. I treated every spec as documentation, not just a handoff. That discipline cut revision cycles in half and kept us moving fast.
              </p>
            </section>

            {/* The Impact */}
            <section id="impact" className="my-14">
              <p className="text-sm text-muted-foreground italic font-serif mb-1">The impact</p>
              <h2 className="text-xl font-semibold mb-6">The numbers that came out the other side.</h2>

              <div className="grid grid-cols-3 gap-4">
                <InsightCard value="80%" label="Faster property sell-out after the presale revamp" highlighted />
                <InsightCard value="₦500M+" label="Total investments on the revamped investor dashboard" highlighted />
                <InsightCard value="50%" label="Increase in conversions from transparency features" />
                <InsightCard value="30%" label="Drop in purchase flow abandonment" />
                <InsightCard value="17K+" label="Users across 15+ countries" />
                <InsightCard value="5K+" label="Wallet transactions processed every month" />
              </div>
            </section>

            {/* Takeaways */}
            <section id="learnings" className="my-14">
              <p className="text-sm text-muted-foreground italic font-serif mb-1">What I took away</p>
              <h2 className="text-xl font-semibold mb-6">A few things this project taught me.</h2>

              <div className="space-y-5">
                <LearningItem number="1">
                  <strong className="font-semibold text-foreground">Transparency is a conversion tool.</strong> Every time I made information more visible — live inventory, deal valuations, income breakdowns — investors responded. Trust and urgency are not opposites. Showing people the real picture made them more likely to act, not less.
                </LearningItem>
                <LearningItem number="2">
                  <strong className="font-semibold text-foreground">New features compound existing problems.</strong> Adding the presale tracker without fixing the purchase flow would have just created a new drop-off point. The order mattered: fix the broken flow first, then build the new thing on top of solid ground.
                </LearningItem>
                <LearningItem number="3">
                  <strong className="font-semibold text-foreground">Working with engineers daily made my specs better.</strong> 98% accuracy didn't come from me being more careful. It came from asking engineers questions every day. Understanding their constraints earlier meant fewer surprises at handoff.
                </LearningItem>
                <LearningItem number="4">
                  <strong className="font-semibold text-foreground">The "upcoming" page changed investor behaviour before launch day.</strong> Getting investors thinking about a deal in advance — days or weeks before it opened — meant that by the time the presale started, they already had conviction. That pre-warming was probably half of the conversion lift.
                </LearningItem>
              </div>
            </section>

            {/* CTA */}
            <CTASection />

            {/* Footer */}
            <footer className="py-6 border-t border-border mt-8">
              <p className="text-xs text-muted-foreground text-center">
                Case study: Cribstock, Lagos, Nigeria, 2023-2024
              </p>
            </footer>
          </div>
        </main>
      </div>
      <ImageLightbox image={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}
