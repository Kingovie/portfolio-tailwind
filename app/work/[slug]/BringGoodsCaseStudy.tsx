'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Envelope } from '@phosphor-icons/react';

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

function FlowDiagram({ title, steps, color }: { title: string; steps: string[]; color?: string }) {
  const colors: Record<string, string> = {
    'Buyer Flow': 'bg-emerald-500',
    'Seller Flow': 'bg-blue-500',
    'Rider Flow': 'bg-purple-500',
  };
  const bgColor = color || colors[title] || 'bg-primary';

  return (
    <div className="my-6 p-4 bg-secondary/50 rounded-xl border border-border">
      <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">{title}</h4>
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <span className={`${bgColor} text-white px-3 py-1.5 rounded-full text-xs font-medium`}>{step}</span>
            {i < steps.length - 1 && <span className="text-muted-foreground text-sm">→</span>}
          </React.Fragment>
        ))}
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

export function BringGoodsCaseStudy() {
  const [activeHeading, setActiveHeading] = useState('');

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
    { id: 'problem', label: 'The Problem Space' },
    { id: 'research', label: 'Research' },
    { id: 'insight1', label: 'Location-Based Pricing' },
    { id: 'insight2', label: 'AI Seller Dashboard' },
    { id: 'solution', label: 'Three-Sided Design' },
    { id: 'admin', label: 'Admin Console' },
    { id: 'academy', label: 'BringGoods Academy' },
    { id: 'insight3', label: 'The Iteration' },
    { id: 'trust', label: 'Trust in the Details' },
    { id: 'outcomes', label: 'Target Outcomes' },
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
                2024-2025
              </div>

              <h1 className="text-3xl font-semibold mb-4">
                BringGoods: Ultra-Fast Fresh Food Delivery with Price Negotiation
              </h1>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">product design</span>
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">ux research</span>
                <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">mobile app</span>
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />In Development
                </span>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed mb-3">
                As Product Designer, I designed BringGoods — a hyperlocal e-commerce platform built to deliver fresh food in under 30 minutes (faster than boiling water) across Lagos, Nigeria. The platform introduced a unique negotiation-based marketplace where buyers request items at their preferred prices and receive competitive offers from nearby sellers in real time.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                I designed the end-to-end experience for buyers, sellers, and riders, creating a system where buyers get fast delivery and fair pricing, sellers reach more customers digitally, and riders maximize earnings through optimized batch deliveries.
              </p>
            </header>

            <div className="relative rounded-lg overflow-hidden border border-border my-8" style={{ aspectRatio: '16/9', maxHeight: '500px' }}>
              <Image src="/projects/bringgoods-wallet.png" alt="BringGoods Product Mockup" fill className="object-contain bg-secondary select-none" draggable="false" onContextMenu={(e) => e.preventDefault()} />
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-4 gap-4 my-8 p-5 bg-card border border-border rounded-lg">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Role</div>
                <div className="text-sm font-medium">Product Designer</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Timeline</div>
                <div className="text-sm font-medium">8 Months</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Team</div>
                <div className="text-sm font-medium">1 Designer, 3 Engineers, 1 PM</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Focus</div>
                <div className="text-sm font-medium">UX Research, UI Design, AI Features</div>
              </div>
            </div>

            {/* The Problem Space */}
            <section id="problem" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">The Problem Space</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Nigeria&apos;s fresh food market is broken in three specific ways. Buyers wait hours for delivery, sometimes 2 to 4 hours for items they could walk five minutes to buy. Sellers want to sell online but have no idea what to stock or how to price it. And riders? They are making single trips when they could be doing three at once.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                But here is the thing nobody talks about: price negotiation is not optional here. Something like 92% of Nigerians expect to haggle in markets. It is not just about the price, it is the dance, the relationship. Every delivery app that has tried to enter this market offered fixed pricing, and every single one felt foreign because of it. Buyers felt powerless. Like they were being told what to pay with no say in the matter.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                On the seller side, it is a different kind of broken. Most vendors in Lagos run on pure intuition. Years of it, sure, but intuition nonetheless. They do not have dashboards or demand forecasts. They buy what they think will sell and hope for the best. If I could give them data, real data about what people near them are actually ordering, that changes everything.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                So the challenge was pretty clear: build a three-sided marketplace where buyers can negotiate, sellers get AI-powered intelligence, and riders can batch deliveries efficiently. And do it in a way that feels like it belongs in Lagos, not Silicon Valley.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The vision we are building toward: groceries delivered in under 30 minutes, before a kettle boils. Every local vendor becomes a digital entrepreneur.
              </p>
            </section>

            {/* Research */}
            <section id="research" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">Research</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                I kicked things off with a month of fieldwork. Twenty user interviews across Lagos, talking to buyers, sellers, and riders, plus visits to about a dozen fresh food markets to watch how people actually transact. Not just observe, but hang around, chat, understand the rhythm of it.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                What I found surprised me. The biggest friction is not logistical. It is psychological. Buyers feel disrespected by fixed prices. Sellers feel erased when they cannot negotiate. And riders? They just want to maximize their earnings per trip.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                There was also this recurring theme I kept hearing: sellers wanted to grow but did not trust technology. Many had been burned by failed platforms before. So whatever I designed needed to feel familiar first, powerful second.
              </p>

              <div className="relative rounded-lg overflow-hidden border border-border bg-secondary my-8" style={{ aspectRatio: '16/9', maxHeight: '500px' }}>
                <Image
                  src="/projects/market-research.png"
                  alt="Research photos from Lagos markets"
                  fill
                  className="object-cover select-none"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-sm font-medium text-white/90">Research Photos, Lagos Markets</p>
                  <p className="text-xs text-white/70">Field visits to Mile 12, Oyingbo, and Ketu markets</p>
                </div>
              </div>

              <BlockQuote author="Research Participant, Oyingbo Market">
                The moment you remove negotiation from a Nigerian market, you have removed the humanity from the transaction.
              </BlockQuote>

              <p className="text-muted-foreground mb-4 leading-relaxed">Three key themes emerged from the research:</p>

              <div className="grid grid-cols-2 gap-4 mt-5">
                <FeatureCard title="Negotiation Is Culture">
                  Not a feature request. Buyers expect to haggle and feel cheated when they cannot.
                </FeatureCard>
                <FeatureCard title="Sellers Need Intelligence">
                  Most run on gut feel. They want data but do not know how to ask for it.
                </FeatureCard>
                <FeatureCard title="Trust Is Fragile">
                  Sellers have been burned by tech platforms before. Onboarding needs to earn their confidence.
                </FeatureCard>
                <FeatureCard title="Time Is Money">
                  Riders optimize instinctively but need tools to batch orders efficiently.
                </FeatureCard>
              </div>
            </section>

            {/* Key Design Decision 01 */}
            <InsightSection id="insight1" label="Key Design Decision 01" title="Why Location-Based Pricing Was Always the Plan">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Here is something I want to be clear about: location-based pricing was in the plan from day one. It was not something we discovered we needed after launch. We knew going in that we had to prevent buyers from gamifying the system.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The scenario we wanted to avoid: a buyer sees tomatoes listed at ₦500, knows they can negotiate, and throws out ₦100 hoping the seller is desperate enough to accept. That is not negotiation, that is exploitation. And it wastes everyones time. The seller has to review and reject, the buyer gets frustrated, and the platform looks broken.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The solution we are building is what I call a <strong className="font-semibold text-foreground">community price floor</strong>, a dynamic anchor that keeps negotiations within a reasonable local range while keeping the haggling dynamic alive. Think of it like guardrails. Buyers can still negotiate and feel like they got a deal, but they cannot waste a sellers time with unserious offers. If tomatoes are ₦500 in Victoria Island, you can bargain down to maybe ₦400, but you cannot ask for ₦100.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is still in active development, so I cannot give you hard numbers yet. But early co-design sessions with vendors in Lagos have been promising. The feedback keeps pointing to the same thing: design decisions have to respect local context. What works in San Francisco will not work in Surulere. That is not a bug. It is the whole point.
              </p>
            </InsightSection>

            {/* Key Design Decision 02 */}
            <InsightSection id="insight2" label="Key Design Decision 02" title="Designing the AI Seller Dashboard">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The conventional wisdom says small vendors are afraid of AI. In my experience, that is only true if you show them a chatbot first. Show them something useful, like &quot;here is what people in your area are buying right now,&quot; and they get it immediately.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                After sellers verify their store, they get access to an AI-powered dashboard that guides their entire journey. I spent a lot of time thinking about what to prioritize here, and it came down to reducing uncertainty:
              </p>

              <div className="grid grid-cols-2 gap-4 mt-5 mb-6">
                <FeatureCard title="Inventory Assistant" ai>
                  AI looks at the sellers location, how much capital they have, and their power supply situation to suggest what items they should stock, backed by real demand data.
                </FeatureCard>
                <FeatureCard title="Video Verification" ai>
                  Geolocation-locked video uploads. Sellers record at their actual store location. Keeps the platform honest without being intrusive.
                </FeatureCard>
                <FeatureCard title="Store Insights" ai>
                  Real-time nudges when inventory is running low, items are about to expire, or prices are out of sync with the market.
                </FeatureCard>
                <FeatureCard title="AI Optimizer" ai>
                  Analyzes performance patterns and suggests what to restock, what new products to try, and honestly, what to stop selling.
                </FeatureCard>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                What I love about this setup is that the AI does not try to replace the sellers intuition. It augments it. A tomato seller in Mushin who has been doing this for fifteen years knows things the data does not. But the AI can tell her something she might not know, like the fact that demand for bell peppers spikes every Thursday in her area. That combination of intuition plus data? That is the sweet spot.
              </p>
            </InsightSection>

            {/* Bringing It Together */}
            <section id="solution" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">Bringing It Together: The Three-Sided Design</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Three-sided marketplaces are tricky because each user has diametrically opposed needs. Buyers want low prices and speed. Sellers want profitability and simplicity. Riders want batch efficiency. If you optimize for one at the expense of the others, the whole thing falls apart.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                My approach was to give each persona their own tailored interface, with AI doing the heavy lifting in the background to keep things balanced.
              </p>

              <h3 className="text-lg font-semibold mt-8 mb-4">Buyer Experience</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The buyer app is designed around one core action: getting what you want at a price that feels fair. Not the lowest price, just a fair one. Before buyers can start shopping, they go through a lightweight onboarding that sets expectations and builds trust from the start.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FeatureCard title="Frictionless Onboarding">
                  Phone number sign-up with OTP, then a quick tutorial that explains how negotiation works on BringGoods — so buyers know what fair pricing looks like before they start.
                </FeatureCard>
                <FeatureCard title="Price Setting & Bidding">
                  Tap an item, pick the size or variant you want, then name your price. The system applies the community floor so offers stay reasonable.
                </FeatureCard>
                <FeatureCard title="Seller Responses">
                  Sellers can accept, counter, or let offers expire. Creates healthy competition.
                </FeatureCard>
                <FeatureCard title="Smart Checkout">
                  Full cost breakdown before confirmation. Address locks after pre-calculation.
                </FeatureCard>
                <FeatureCard title="Real-Time Tracking">
                  Processing to Packing to Dispatch. Visible at every stage.
                </FeatureCard>
              </div>
              <FlowDiagram title="Buyer Flow" steps={['Onboarding', 'Select Items', 'Set Price', 'Seller Responds', 'Accept', 'Pay & Track']} />

              <div className="relative rounded-lg overflow-hidden border border-border my-8 bg-secondary">
                <img src="/projects/Buyers Flow - Onboarding.png" alt="Buyer App - Onboarding and Shopping Flow" className="w-full h-auto select-none" loading="lazy" draggable="false" onContextMenu={(e) => e.preventDefault()} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-sm font-medium text-white/90">Buyer App</p>
                  <p className="text-xs text-white/70">Key Onboarding & Shopping Moments</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-8 mb-4">Seller Experience</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                For sellers, the priority was making them feel in control while giving them tools they had never had before. The AI suggestions are just that: suggestions. The seller always makes the final call.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FeatureCard title="AI Onboarding" ai>
                  Smart recommendations from day one based on their location and profile.
                </FeatureCard>
                <FeatureCard title="Verification">
                  Video proof at their store location. Builds trust for buyers.
                </FeatureCard>
                <FeatureCard title="Quick Processing">
                  Swipe &quot;Ready for Pickup.&quot; Five minutes, done.
                </FeatureCard>
                <FeatureCard title="AI Optimizer" ai>
                  Restock recommendations, expansion ideas, and performance trends.
                </FeatureCard>
              </div>
              <FlowDiagram title="Seller Flow" steps={['Onboarding', 'Verify Store', 'AI Assistant', 'Add Inventory', 'Manage & Optimize']} />

              <div className="relative rounded-lg overflow-hidden border border-border my-8 bg-secondary">
                <img src="/projects/Sellers Flow - Onboarding.png" alt="Seller App - Onboarding and Store Management" className="w-full h-auto select-none" loading="lazy" draggable="false" onContextMenu={(e) => e.preventDefault()} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-sm font-medium text-white/90">Seller App</p>
                  <p className="text-xs text-white/70">Key Onboarding & Store Management Moments</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-8 mb-4">Rider Experience</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Riders are the backbone of the operation. If they are not efficient, nobody gets their food. The rider interface focuses on maximizing earning potential per trip.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FeatureCard title="Multi-Order Batching">
                  Accept up to 3 orders at once. System optimizes the route.
                </FeatureCard>
                <FeatureCard title="Smart Routing">
                  Pickup sequence optimized for minimal backtracking.
                </FeatureCard>
                <FeatureCard title="Verification System">
                  Confirm arrival, scan pickup codes, verify items with sellers.
                </FeatureCard>
              </div>
              <FlowDiagram title="Rider Flow" steps={['Onboarding', 'Accept Orders', 'Monitor', 'Pickup Alert', 'Verify', 'Next Stop']} />

              <div className="relative rounded-lg overflow-hidden border border-border my-8 bg-secondary">
                <img src="/projects/Rider Flow - Onboarding.png" alt="Rider App - Onboarding and Delivery Flow" className="w-full h-auto select-none" loading="lazy" draggable="false" onContextMenu={(e) => e.preventDefault()} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-sm font-medium text-white/90">Rider App</p>
                  <p className="text-xs text-white/70">Key Onboarding & Delivery Moments</p>
                </div>
              </div>
            </section>

            {/* Admin Console */}
            <section id="admin" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">BringGoods Admin Console</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                I designed the BringGoods Admin Console as the mission-critical command center for our operations team and management to monitor and control the entire three-sided marketplace in real-time. This centralized dashboard serves as the nerve system that keeps buyers, sellers, and riders coordinated while maintaining marketplace health and trust.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-5 mb-6">
                <FeatureCard title="Real-Time Marketplace Monitoring">
                  The dashboard surfaces critical KPIs including total orders, completion rates, average delivery times, and active orders in progress. Operations teams can instantly spot bottlenecks and intervene when needed.
                </FeatureCard>
                <FeatureCard title="User Management & Verification">
                  Comprehensive oversight of buyer, seller, and rider onboarding with approval workflows, verification tracking, and churn analysis. This reduces fraud and maintains platform quality.
                </FeatureCard>
                <FeatureCard title="Financial Operations Center">
                  Complete financial oversight including GMV tracking, seller/rider payouts, refund management, and commission monitoring. Ensures transparent and timely settlements across the marketplace.
                </FeatureCard>
                <FeatureCard title="Performance Analytics">
                  Deep insights into rider efficiency, delivery accuracy, customer ratings, and platform uptime. Data-driven decision making to optimize marketplace operations.
                </FeatureCard>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                The admin console uses role-based permissions to protect sensitive data while enabling customer support teams to resolve disputes quickly. By centralizing operations, it allows BringGoods to scale efficiently while maintaining the quality and speed that defines our &quot;before kettle boils&quot; promise.
              </p>

              <div className="relative rounded-lg overflow-hidden border border-border my-8 bg-secondary">
                <img src="/projects/Admin console.png" alt="BringGoods Admin Console" className="w-full h-auto select-none" loading="lazy" draggable="false" onContextMenu={(e) => e.preventDefault()} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-sm font-medium text-white/90">Admin Console</p>
                  <p className="text-xs text-white/70">Dashboard & Analytics Views</p>
                </div>
              </div>
            </section>

            {/* BringGoods Academy */}
            <section id="academy" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">BringGoods Academy</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Recognizing that many potential sellers lacked e-commerce experience, I designed the BringGoods Academy as both a training hub and strategic onboarding tool. This separate platform provides free business education before introducing sellers to our marketplace, ensuring they have the skills needed to succeed.
              </p>

              <h3 className="text-lg font-semibold mt-8 mb-4">Dual-Purpose Education Strategy</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The Academy serves two interconnected goals: first, it provides comprehensive business training on topics like product selection, pricing strategies, order handling, customer service, social media marketing, and compliance. Second, after completing the free training, participants learn how to leverage the BringGoods platform specifically for their business growth.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-5 mb-6">
                <FeatureCard title="Business Fundamentals Training">
                  Comprehensive modules covering product selection, competitive pricing, inventory management, customer service excellence, and digital marketing basics — essential skills for marketplace success.
                </FeatureCard>
                <FeatureCard title="Platform Integration Pathway">
                  Seamless transition from general business education to BringGoods-specific training, including account setup, product listing optimization, and seller tool utilization.
                </FeatureCard>
                <FeatureCard title="Interactive Learning Experience">
                  Video tutorials, knowledge-testing quizzes, and certification programs that ensure participants truly understand both business principles and platform mechanics.
                </FeatureCard>
                <FeatureCard title="Compliance & Quality Focus">
                  Special emphasis on food safety standards, business regulations, and marketplace policies — crucial for fresh food sellers in Nigeria&apos;s regulatory environment.
                </FeatureCard>
              </div>

              <h3 className="text-lg font-semibold mt-8 mb-4">Target Audience & Impact</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The Academy primarily serves aspiring entrepreneurs with little business experience, first-time e-commerce sellers needing guidance, and existing market traders wanting to digitize their operations. By providing free, comprehensive education, we ensure sellers enter the marketplace prepared for success rather than learning through costly mistakes.
              </p>

              <BlockQuote author="Kemi Adebayo, Fresh Produce Seller, Academy Graduate">
                The BringGoods Academy taught me everything I needed to know about running an online business. After completing the program, setting up my store was so much easier — I already understood pricing, customer service, and how to use social media to grow my sales.
              </BlockQuote>

              <div className="relative rounded-lg overflow-hidden border border-border my-8 bg-secondary">
                <img src="/projects/Bringgood Academy.png" alt="BringGoods Academy" className="w-full h-auto select-none" loading="lazy" draggable="false" onContextMenu={(e) => e.preventDefault()} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-sm font-medium text-white/90">BringGoods Academy</p>
                  <p className="text-xs text-white/70">Course Interface</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                This educational approach differentiates BringGoods from competitors by investing in seller success rather than simply providing a platform. Well-trained sellers provide better service, leading to higher buyer satisfaction and stronger marketplace growth.
              </p>
            </section>

            {/* Key Design Decision 03 */}
            <InsightSection id="insight3" label="Key Design Decision 03" title="The Iteration That Shaped the Product">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The negotiation flow went through three completely different versions before we landed on something that worked. And honestly? That is totally fine.
              </p>
              <p className="text-muted-foreground mb-3 leading-relaxed">
                <strong className="font-semibold text-foreground">V1:</strong> Buyers set a price, sellers accept or reject. Simple, clean, and it failed spectacularly in testing. 30% acceptance rate. Sellers felt like they had no agency. They either took the offer or got nothing.
              </p>
              <p className="text-muted-foreground mb-3 leading-relaxed">
                <strong className="font-semibold text-foreground">V2:</strong> Added counter-offers. Acceptance jumped to 60%, but now a new problem emerged: sellers felt rushed. They would get a notification and had to respond quickly or risk losing the sale. Some sellers told us it felt stressful, which was the opposite of what we wanted.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong className="font-semibold text-foreground">V3:</strong> Quick accept buttons for sellers who want to win fast, plus automatic pricing rules for sellers who do not want to engage with every single offer. Acceptance hit 92% with test users. More importantly, sellers reported feeling in control again.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The lesson here: iteration is not scope creep, it is the actual design process. Test something, watch what happens, trust the data, evolve. Every version taught us something the previous one could not.
              </p>
            </InsightSection>

            {/* Key Design Decision 04 */}
            <InsightSection id="trust" label="Key Design Decision 04" title="Trust Lives in the Details">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Beyond the core flow, I added features that make the platform feel human. Not everything needs to move a metric. Some things just need to make someone feel looked after.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-5 mb-6">
                <FeatureCard title="BringGoods Academy">
                  Free business training for sellers before they start. Helps them understand digital commerce on their own terms.
                </FeatureCard>
                <FeatureCard title="Real-Time Tracking">
                  Processing to Packing to Dispatch. Target: 45% fewer support tickets.
                </FeatureCard>
                <FeatureCard title="Admin Console">
                  Operations dashboard for monitoring marketplace health. We need to see what is working.
                </FeatureCard>
                <FeatureCard title="Pickup Verification">
                  Codes at pickup prevent wrong orders. Small thing, huge trust builder.
                </FeatureCard>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                These features do not drive the primary metrics, but they create emotional value. The goal is for users to feel cared for, not just served. That distinction matters a lot more than most product teams realize.
              </p>
            </InsightSection>

            {/* Target Outcomes */}
            <section id="outcomes" className="my-14">
              <h2 className="text-xl font-semibold mt-8 mb-4">Target Outcomes</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We are still building, so I cannot claim these as results yet. But these are the targets we are designing toward, the North Stars that guide every decision:
              </p>

              <div className="grid grid-cols-3 gap-4 my-8">
                <div className="bg-card border border-border rounded-lg p-5 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">&lt;30 min</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Delivery Target</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-5 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">3X</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Rider Earnings Goal</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-5 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">92%</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Negotiation Adoption Goal</div>
                </div>
              </div>

              <div className="overflow-x-auto my-6 border border-border rounded-lg bg-card">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Metric</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Current Reality</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Delivery Time', '2-4 hours', 'Under 30 min'],
                      ['Price Control', 'Fixed only', 'Buyer negotiation'],
                      ['Seller Decisions', 'Pure intuition', 'AI-powered insights'],
                      ['Rider Batching', 'Single orders', 'Up to 3 at once'],
                      ['Seller Reach', 'Physical store only', 'Digital marketplace'],
                    ].map(([metric, before, after]) => (
                      <tr key={metric} className="border-b border-border/50 last:border-0">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{metric}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground line-through">{before}</td>
                        <td className="px-4 py-3 text-sm text-primary font-medium">{after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* CTA */}
            <CTASection />

            {/* Footer */}
            <footer className="py-6 border-t border-border mt-8">
              <p className="text-xs text-muted-foreground text-center">
                Case study: BringGoods, Lagos, Nigeria, 8 months, 24&apos;-25&apos;
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
