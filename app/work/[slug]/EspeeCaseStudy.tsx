'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Envelope, X } from '@phosphor-icons/react';
import { buyerScreens, sellerScreens, type ScreenShot } from '../../data/espee-screens';

function FeatureCard({ title, children, ai }: { title: string; children: React.ReactNode; ai?: boolean }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ai ? 'bg-purple-500' : 'bg-primary'}`} />
        {title}
        {ai && <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">AI</span>}
      </h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
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

interface LightboxImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
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
        <p className="mt-3 text-center text-sm font-medium text-neutral-700">{image?.alt}</p>
      </div>
    </div>
  );
}

// Wide web screenshots don't suit a narrow phone-shaped filmstrip, so each
// screen gets its own full-width card, stacked two-up — same bordered/caption
// treatment used elsewhere on the site, just without step numbering.
// Same treatment as the Cribstock purchase flow: each screen gets its own
// full-width row, shown whole at its natural aspect — never cropped.
function ScreenGrid({ items, onSelect }: { items: ScreenShot[]; onSelect: (image: LightboxImage) => void }) {
  return (
    <div className="my-8">
      {items.map((item) =>
        item.src ? (
          <div
            key={item.title}
            className="relative rounded-lg overflow-hidden border border-border my-6 bg-secondary cursor-zoom-in"
            onClick={() => onSelect({ src: item.src as string, alt: item.title, width: item.width, height: item.height })}
          >
            <Image
              src={item.src}
              alt={item.title}
              width={item.width ?? 1600}
              height={item.height ?? 1150}
              className="w-full h-auto select-none"
              sizes="(min-width: 1024px) 672px, 100vw"
              loading="lazy"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-sm font-medium text-white/90">{item.title}</p>
              <p className="text-xs text-white/70">{item.caption}</p>
            </div>
          </div>
        ) : (
          // Empty slot, sized like the real thing, until the export lands.
          <div
            key={item.title}
            className="relative rounded-lg overflow-hidden border border-dashed border-border my-6 bg-secondary"
            style={{ aspectRatio: '16 / 10' }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground/70 mt-1">{item.caption}</p>
              </div>
            </div>
          </div>
        )
      )}
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

function InsightSection({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="my-14">
      <div className="my-12 pt-10 border-t border-border">
        <p className="text-sm text-muted-foreground italic font-serif mb-1">{label}</p>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </section>
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

export function EspeeCaseStudy() {
  const [activeHeading, setActiveHeading] = useState('');
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);

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
    { id: 'challenge', label: 'The Product Challenge' },
    { id: 'ecosystem', label: 'Understanding the Ecosystem' },
    { id: 'goals', label: 'Product Goals' },
    { id: 'decision1', label: 'Trust With the Brand' },
    { id: 'decision2', label: 'Three Experiences' },
    { id: 'solution', label: 'From Problem to Solution' },
    { id: 'design', label: 'Designing the Experience' },
    { id: 'principles', label: 'Design Principles' },
    { id: 'reflection', label: 'Reflection' },
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
                2026
              </div>

              <h1 className="text-3xl font-semibold mb-4">
                Espee Marketplace: Designing a Managed Marketplace That Feels Like One Trusted Store
              </h1>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">product design</span>
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">marketplace</span>
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">e-commerce</span>
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />In Development
                </span>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed mb-3">
                As Product Designer, I designed Espee Marketplace, a managed e-commerce platform powered by Espees (SPS), a global digital currency and blockchain-based payment system.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                At first glance, the experience feels familiar. Customers browse products, add items to their cart, pay using Espees, and track their delivery. What they never see is everything happening behind the scenes. Every product is supplied by a verified seller. Sellers manage their inventory, prepare orders, and hand them over to Espee through rider pickups or fulfillment center drop-offs. From that point onward, Espee manages delivery, customer communication, and the overall shopping experience.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                My role was to design the buyer, seller, and operational experiences so they work together as one product while keeping the buying journey simple and consistent.
              </p>
            </header>

            {/* Hero Image */}
            <div className="my-8">
              <div className="relative rounded-lg overflow-hidden border border-border" style={{ aspectRatio: '16/10' }}>
                <Image src="/projects/espee-market-hero.jpg" alt="Espee Marketplace" fill className="object-cover" />
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-4 gap-4 my-8 p-5 bg-card border border-border rounded-lg">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Role</div>
                <div className="text-sm font-medium">Product Designer</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Timeline</div>
                <div className="text-sm font-medium">X Months</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Team</div>
                <div className="text-sm font-medium">1 Designer, X Engineers, X PM</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Focus</div>
                <div className="text-sm font-medium">Product Strategy, Marketplace UX, Seller Experience, Logistics</div>
              </div>
            </div>

            {/* The Product Challenge */}
            <section id="challenge" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">The Product Challenge</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Most marketplaces are built around sellers. You compare stores, check seller ratings, decide who to trust, then place your order. Espee Marketplace takes a different approach.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The platform is powered by verified sellers, but buyers are never expected to think about who those sellers are. Every interaction is designed to feel like buying directly from Espee.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                That decision sounds like branding, but it quickly became a product challenge. Every order sets off a chain of operational events behind the scenes. Sellers receive new orders, prepare packages, choose how they want to fulfill them, operations teams coordinate fulfillment, riders complete deliveries, and customers simply expect their package to arrive on time.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The challenge wasn't designing another marketplace. It was designing a marketplace that hides its own complexity.
              </p>
            </section>

            {/* Understanding the Ecosystem */}
            <section id="ecosystem" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">Understanding the Ecosystem</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Although customers interact with a single brand, the product supports three interconnected experiences.
              </p>

              <div className="grid grid-cols-1 gap-4 mt-5 mb-6">
                <FeatureCard title="Buyers">
                  Browse products, place orders, pay with Espees, and track deliveries through a familiar shopping experience.
                </FeatureCard>
                <FeatureCard title="Sellers">
                  Manage products, update inventory, process incoming orders, prepare packages, and choose between requesting rider pickup or delivering packages to an Espee fulfillment center.
                </FeatureCard>
                <FeatureCard title="Operations &amp; Logistics">
                  Coordinate fulfillment, monitor package movement, assign riders, and ensure every order reaches the customer.
                </FeatureCard>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Each group has completely different goals, but the experience should feel connected rather than fragmented.
              </p>
            </section>

            {/* Product Goals */}
            <section id="goals" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">Product Goals</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  Make shopping feel like buying directly from Espee rather than individual sellers.
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  Give verified sellers efficient tools for managing inventory and fulfilling orders.
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  Create a standardized fulfillment process regardless of how sellers hand over packages.
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  Keep operational complexity away from buyers.
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  Build a scalable foundation that supports marketplace growth without changing the customer experience.
                </li>
              </ul>
            </section>

            {/* Key Design Decision 01 */}
            <InsightSection id="decision1" label="Key Design Decision 01" title="Trust Should Live With the Brand">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Customers don't actually want to evaluate dozens of different sellers every time they shop. They simply want confidence that the product will arrive as expected.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Instead of making individual sellers the center of the experience, the platform puts Espee at the center. Verified sellers operate behind the scenes while Espee owns the customer relationship — from browsing and payment to delivery and support.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                That decision influenced almost every screen in the product.
              </p>
            </InsightSection>

            {/* Key Design Decision 02 */}
            <InsightSection id="decision2" label="Key Design Decision 02" title="One Product, Three Experiences">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Buyers want simplicity. Browse. Buy. Track.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Sellers need operational tools. Inventory management. Order processing. Package preparation. Pickup requests.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Operations teams need visibility into everything happening between those two experiences.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Instead of forcing everyone into one workflow, each experience was designed around the decisions its users need to make.
              </p>
            </InsightSection>

            {/* From Problem to Solution */}
            <section id="solution" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">From Problem to Solution</h2>

              <div className="overflow-x-auto my-6 border border-border rounded-lg bg-card">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Product Challenge</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Design Decision</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Buyers shouldn't have to evaluate individual sellers.", "Designed a unified customer experience where Espee owns the relationship with the buyer."],
                      ["Sellers need efficient operational tools.", "Built dedicated inventory, order management, and fulfillment workflows."],
                      ["Fulfillment can happen in multiple ways.", "Standardized the experience around two handover methods: rider pickup or fulfillment center drop-off."],
                      ["Multiple teams are involved after every purchase.", "Designed connected workflows for sellers, operations teams, and riders while keeping the customer journey simple."],
                      ["Espees is a different payment ecosystem.", "Integrated payments into a familiar checkout experience rather than introducing new shopping behaviours."],
                    ].map(([challenge, decision]) => (
                      <tr key={challenge} className="border-b border-border/50 last:border-0">
                        <td className="px-4 py-3 text-sm text-muted-foreground">{challenge}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{decision}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Designing the Experience */}
            <section id="design" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">Designing the Experience</h2>

              <h3 className="text-lg font-semibold mt-8 mb-4">Buyer Experience</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The buyer experience focuses on confidence. Customers should be able to discover products, understand what they're purchasing, complete payments with Espees, and track deliveries without thinking about the operational systems supporting their order.
              </p>

              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Buyer App — Browse, Checkout &amp; Tracking
              </p>
              <ScreenGrid items={buyerScreens} onSelect={setLightbox} />

              <h3 className="text-lg font-semibold mt-8 mb-4">Seller Experience</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The seller experience focuses on efficiency. Sellers can manage inventory, receive orders, prepare packages, request rider pickup, or deliver packages directly to an Espee fulfillment center.
              </p>

              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Seller Dashboard — Inventory, Orders &amp; Fulfillment
              </p>
              <ScreenGrid items={sellerScreens} onSelect={setLightbox} />
            </section>

            {/* Design Principles */}
            <section id="principles" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">Design Principles</h2>

              <div className="grid grid-cols-1 gap-4 mt-5 mb-6">
                <FeatureCard title="Familiar Before Different">
                  Shopping should feel familiar even though payments are powered by Espees.
                </FeatureCard>
                <FeatureCard title="Hide Complexity">
                  Customers only see what they need. Operational complexity stays behind the scenes.
                </FeatureCard>
                <FeatureCard title="One Brand, One Experience">
                  Every interaction reinforces trust in Espee regardless of which seller fulfills the order.
                </FeatureCard>
              </div>
            </section>

            {/* Reflection */}
            <section id="reflection" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">Reflection</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Espee Marketplace reminded me that good product design isn't always about adding features. Sometimes it's about deciding what users should never have to think about.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Designing Espee challenged me to think beyond interfaces and consider the relationships between commerce, logistics, and operations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                It reinforced an idea that continues to influence how I design products today: the more complex the system becomes behind the scenes, the simpler the experience should feel for the people using it.
              </p>
            </section>

            {/* CTA */}
            <CTASection />

            {/* Footer */}
            <footer className="py-6 border-t border-border mt-8">
              <p className="text-xs text-muted-foreground text-center">
                Case study: Espee Marketplace, 2026
              </p>
            </footer>
          </div>
        </main>
      </div>
      <ImageLightbox image={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}
