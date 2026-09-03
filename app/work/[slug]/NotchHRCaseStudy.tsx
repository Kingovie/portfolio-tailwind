'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, Envelope, X } from '@phosphor-icons/react';

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

function BlockQuote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <div className="my-6 p-5 bg-secondary/50 border-l-4 border-primary rounded-r-lg">
      <p className="text-foreground italic text-base leading-relaxed">&ldquo;{children}&rdquo;</p>
      {author && <p className="text-xs text-muted-foreground mt-2 font-normal not-italic">&mdash; {author}</p>}
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

export function NotchHRCaseStudy() {
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
    { id: 'challenge', label: 'The Challenge' },
    { id: 'story', label: 'Finding a Clearer Product Story' },
    { id: 'outcomes', label: 'From Features to Outcomes' },
    { id: 'product-led', label: 'A Product-Led Experience' },
    { id: 'visual', label: 'The Visual Redesign' },
    { id: 'development', label: 'Bringing the Design to Life' },
    { id: 'result', label: 'The Result' },
    { id: 'learnings', label: 'What I Learned' },
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
                NotchHR: Reimagining the HR Experience for Modern Teams
              </h1>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">product design</span>
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">web app</span>
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">ux audit</span>
                <span className="inline-flex items-center gap-1.5 bg-secondary text-muted-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />Concept
                </span>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed mb-3">
                As Product Designer, I redesigned NotchHR&apos;s landing page experience to communicate its product more clearly and create a more modern SaaS experience.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                NotchHR is an HR platform designed to help businesses manage their people and everyday HR operations. The challenge wasn&apos;t that NotchHR lacked features &mdash; if anything, there were a lot of them. The challenge was deciding how to present all that capability without making the experience feel overwhelming.
              </p>
              <a href="https://notchhr-landing.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mt-3 underline underline-offset-4">
                View live redesign <ArrowUpRight size={14} weight="bold" />
              </a>
            </header>

            {/* Hero Image */}
            <div className="my-8">
              <div className="relative rounded-lg overflow-hidden border border-border">
                <Image src="/projects/notchhr-redesign.png" alt="NotchHR Redesign" width={1600} height={900} className="w-full h-auto" />
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-4 gap-4 my-8 p-5 bg-card border border-border rounded-lg">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Role</div>
                <div className="text-sm font-medium">Product Designer</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Scope</div>
                <div className="text-sm font-medium">UX Audit, UX/UI Design, Landing Page, Frontend</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Tools</div>
                <div className="text-sm font-medium">Figma, Claude Code, Vercel</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Type</div>
                <div className="text-sm font-medium">Independent Concept</div>
              </div>
            </div>

            {/* The Challenge */}
            <section id="challenge" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">The Challenge</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                NotchHR had a lot to offer, but the existing experience didn&apos;t communicate that value as clearly as it could.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                As I explored the website, I noticed that many features were presented with similar visual weight. This made it harder to understand what the product really stood for, how the different capabilities fit together, and which benefits mattered most to a potential customer.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                I wanted to answer three questions:
              </p>
              <ul className="space-y-3 text-muted-foreground mb-4">
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  How can the value of NotchHR become clear within the first few moments?
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  How can a large feature set feel organized rather than overwhelming?
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  How can the experience feel more like a modern SaaS product while staying true to the NotchHR brand?
                </li>
              </ul>
            </section>

            {/* Finding a Clearer Product Story */}
            <InsightSection id="story" label="Information Architecture" title="Finding a Clearer Product Story">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Rather than treating every feature as a separate item, I started thinking about NotchHR as a connected product ecosystem.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                I grouped the platform into five broader areas:
              </p>
              <div className="grid grid-cols-1 gap-4 mt-5 mb-6">
                <FeatureCard title="Workforce Management">
                  Centralized tools for managing employee data, org structure, and day-to-day HR operations.
                </FeatureCard>
                <FeatureCard title="Payroll &amp; Finance">
                  End-to-end payroll processing, compensation management, and financial reporting.
                </FeatureCard>
                <FeatureCard title="Talent &amp; Performance">
                  Recruitment workflows, onboarding, performance reviews, and growth tracking.
                </FeatureCard>
                <FeatureCard title="Employee Experience">
                  Self-service portals, leave management, engagement tools, and communication channels.
                </FeatureCard>
                <FeatureCard title="HR Analytics">
                  Dashboards and reporting to help teams make data-driven people decisions.
                </FeatureCard>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                This gave the product a much clearer structure. Instead of asking users to work through a long list of capabilities, the experience could introduce the broader problem each area solves and then progressively reveal the features within it. The feature experience was inspired by the way modern SaaS products such as Stripe organize complex product offerings without overwhelming the user.
              </p>
            </InsightSection>

            {/* Moving From Features to Outcomes */}
            <section id="outcomes" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">From Features to Outcomes</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Once the product structure was clearer, I wanted the story to move beyond simply telling users what NotchHR can do.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                This led to the section <strong>&ldquo;Built for the way modern teams work.&rdquo;</strong> The purpose was to connect the product&apos;s capabilities to outcomes that matter to businesses: working more efficiently, making better decisions, empowering employees, and scaling with confidence.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                This created a more natural progression throughout the page:
              </p>
              <BlockQuote author="Page Flow">
                What NotchHR is &rarr; What it can do &rarr; How it helps &rarr; Why it matters.
              </BlockQuote>
            </section>

            {/* Creating a More Product-Led Experience */}
            <InsightSection id="product-led" label="Product Strategy" title="Creating a More Product-Led Experience">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The original experience relied heavily on text to explain the platform. For the redesign, I wanted the product itself to become part of the storytelling.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                I introduced larger interface previews, clearer product sections, stronger visual hierarchy, and more intentional whitespace. Rather than showing UI simply as decoration, the interface became a way to demonstrate what the product feels like to use.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The goal was to make the page feel less like a list of HR features and more like an experience of the product itself.
              </p>
            </InsightSection>

            {/* The Visual Redesign */}
            <section id="visual" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">The Visual Redesign</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                With the information architecture and content direction established, I focused on creating a visual system that felt modern, confident, and easy to navigate.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The redesign uses stronger typography, more generous spacing, clearer section transitions, and a consistent visual language across the page.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I also introduced more deliberate visual rhythm between content-heavy sections and product-focused moments, giving the page room to breathe while maintaining momentum.
              </p>

              <div className="grid grid-cols-1 gap-4 mt-6">
                <FeatureCard title="Stronger Typography">
                  Clear hierarchy with purposeful font weights and sizes to guide the eye through the page.
                </FeatureCard>
                <FeatureCard title="Generous Spacing">
                  More intentional whitespace between sections to create breathing room and reduce cognitive load.
                </FeatureCard>
                <FeatureCard title="Visual Rhythm">
                  Alternating between content-heavy and product-focused sections to maintain engagement throughout.
                </FeatureCard>
              </div>
            </section>

{/* Before/After */}
            <section className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">Before & After</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The original site presented features with similar visual weight, making it hard to grasp the product's core value. The redesign introduces clear hierarchy, a five-pillar structure, and product-led storytelling.
              </p>
              <div className="my-8">
                <div
                  className="relative rounded-lg overflow-hidden border border-border my-6 bg-secondary cursor-zoom-in"
                  onClick={() => setLightbox({ src: '/projects/notchhr-before.png', alt: 'NotchHR — Before', width: 1600, height: 1150 })}
                >
                  <Image
                    src="/projects/notchhr-before.png"
                    alt="NotchHR — Before"
                    width={1600}
                    height={1150}
                    className="w-full h-auto select-none"
                    sizes="(min-width: 1024px) 672px, 100vw"
                    loading="lazy"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-sm font-medium text-white/90">Before — Original Website</p>
                  </div>
                </div>
                <div
                  className="relative rounded-lg overflow-hidden border border-border my-6 bg-secondary cursor-zoom-in"
                  onClick={() => setLightbox({ src: '/projects/notchhr-after.png', alt: 'NotchHR — After', width: 1600, height: 1150 })}
                >
                  <Image
                    src="/projects/notchhr-after.png"
                    alt="NotchHR — After"
                    width={1600}
                    height={1150}
                    className="w-full h-auto select-none"
                    sizes="(min-width: 1024px) 672px, 100vw"
                    loading="lazy"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-white/90">After — Redesign</p>
                    <a href="https://notchhr-landing.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-white/90 hover:text-white transition-colors px-2 py-1 rounded bg-white/10 backdrop-blur-sm">
                      View live <ArrowUpRight size={12} weight="bold" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Bringing the Design to Life */}
            <InsightSection id="development" label="Frontend Development" title="Bringing the Design to Life">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                I didn&apos;t want the project to stop at a Figma concept.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                After completing the design, I used <strong>Claude Code</strong> to turn the landing page into a fully responsive website and deployed it with <strong>Vercel</strong>.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Building the experience allowed me to see the design beyond static screens and refine things such as responsive layouts, spacing, transitions, interactions, and the overall visual rhythm of the page.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                It also gave me an opportunity to explore how the design decisions would translate into a real product experience.
              </p>
            </InsightSection>

            {/* The Result */}
            <section id="result" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">The Result</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The redesign creates a more focused and product-led experience for NotchHR.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                It makes the platform easier to understand, gives its extensive feature set a clearer structure, and shifts the story from simply listing capabilities to communicating the value behind them.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                More importantly, the project allowed me to approach a redesign from both sides: <strong>how the product should look</strong> and <strong>how the experience should communicate.</strong>
              </p>
            </section>

            {/* What I Learned */}
            <section id="learnings" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">What I Learned</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                A good redesign isn&apos;t about adding more.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                It&apos;s about understanding what deserves attention, what can be simplified, and how every part of the experience can help the user understand the product.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For NotchHR, the biggest opportunity wasn&apos;t to show more. It was to <strong>make what was already there easier to understand.</strong>
              </p>
            </section>

            {/* CTA */}
            <CTASection />

            {/* Footer */}
            <footer className="py-6 border-t border-border mt-8">
              <p className="text-xs text-muted-foreground text-center">
                Case study: NotchHR, 2026
              </p>
            </footer>
          </div>
        </main>
      </div>
      <ImageLightbox image={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}
