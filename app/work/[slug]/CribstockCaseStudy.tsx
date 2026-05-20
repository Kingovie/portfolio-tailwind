'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar } from '@phosphor-icons/react';

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

export function CribstockCaseStudy() {
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
    { id: 'context', label: 'The Context' },
    { id: 'problem', label: 'The Problem' },
    { id: 'dashboard', label: 'The Dashboard' },
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
                2025
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
                Real estate in Nigeria — Lagos especially — has always been out of reach for most people. Cribstock was trying to fix that. Shares from ₦100,000. Rental income distributed to your wallet. Full ownership potential over five years.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The product worked. But when I joined, users were dropping off mid-purchase, the dashboard told you very little about what was happening with your money, and there was zero way to know what was coming next or to follow a presale as it played out. I was brought in to fix all of that.
              </p>
            </section>

            {/* The Problem */}
            <section id="problem" className="my-14">
              <p className="text-sm text-muted-foreground italic font-serif mb-1">The problem</p>
              <h2 className="text-xl font-semibold mb-4">Imagine being a first-time property investor.</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                You've never owned real estate. You're being asked to put ₦100,000 into a building you can't physically touch. The app doesn't tell you how close the deal is to selling out. You can't see what's coming next month. And the dashboard — supposed to be the thing that makes you feel in control of your investment — doesn't really show you much.
              </p>

              <BlockQuote>
                You sign up. You browse a property. You start the purchase flow. Something confuses you halfway through and you leave. You never come back.
              </BlockQuote>

              <p className="text-muted-foreground leading-relaxed">
                That was the loop Cribstock was stuck in. Drop-offs in the purchase flow. Low urgency around presales. A dashboard that didn't earn trust. I had to fix the existing experience, and then design the features that were missing entirely.
              </p>
            </section>

            {/* What I worked on */}
            <section id="dashboard" className="my-14">
              <p className="text-sm text-muted-foreground italic font-serif mb-1">What I worked on</p>
              <h2 className="text-xl font-semibold mb-6">Four areas. Two revamps, three new features.</h2>

              <h3 className="text-lg font-semibold mt-8 mb-3">01 — The dashboard</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The existing dashboard was there, but it wasn't really doing its job. Investors couldn't quickly understand their portfolio value, what income they'd received, or what their wallet was doing. I redesigned it around what investors actually need to feel in control: value at a glance, income received, wallet activity. Clear hierarchy. No clutter.
              </p>

              <ImagePlaceholder label="[Dashboard — before & after]" caption="Side-by-side or stacked. Shows the redesign in context." />

              <p className="text-muted-foreground mb-6 leading-relaxed">
                The dashboard now handles ₦500M+ in investments and processes 5,000+ wallet transactions every month.
              </p>

              <h3 className="text-lg font-semibold mt-8 mb-3">02 — The property purchase flow</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Buying a property share had too many steps, too much jargon, and not enough reassurance along the way. I stripped it back. I made the pricing concrete (₦100K per share), the returns tangible (up to ₦1M in rental income per deal), and the steps feel like something a person — not a compliance form — designed them.
              </p>

              <ImagePlaceholder label="[Purchase flow screens]" caption="2–3 sequential screens on mobile. A GIF showing the flow in motion is even better here." />

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
                This one didn't exist before I joined. There was no way for an investor to see a presale unfolding in real time — how many shares had sold, how many were left, how close a property was to fully funded. I introduced a live progress tracker for each listing. Shares sold. Shares remaining. A counter that moves.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                What I didn't fully anticipate was the psychological effect. When you can see a number going down, you don't want to wait. Investors started feeling urgency they hadn't felt before — not manufactured urgency, just the honest reality of limited supply made visible.
              </p>

              <PMQuote author="Product Manager, Cribstock">
                For the first time, we were able to sell out our new property stock quicker and faster. The revamp brought a kind of urgency to investors — they needed to hurry so they didn't miss out.
              </PMQuote>

              <ImagePlaceholder label="[Presale tracker — key screen]" caption="The most important visual in this case study. Show the live counter, progress bar, and remaining shares." />

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
                If investors didn't know what was coming, they had no reason to stay ready. I designed a dedicated upcoming deals page — each property listed before it opens, with the deal valuation, property type, and launch date visible. The goal was simple: let investors make up their mind before the clock starts. So when a presale drops, they're not deciding — they're acting.
              </p>

              <ImagePlaceholder label="[Upcoming presales page]" caption="Full-page or above-the-fold screenshot. Deal cards, valuations, launch dates visible." />

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
                Cribstock offers two products: co-ownership (long-term appreciation) and rental (monthly cashflow). Neither had a page that actually explained what the deal was. I designed new website pages for both. Co-ownership: shareholding structure, property valuation, exit timeline. Rental: income rate, payout schedule, occupancy status. The kind of information that turns "maybe" into "yes."
              </p>

              <div className="grid grid-cols-2 gap-4 my-6">
                <ImagePlaceholder label="[Co-ownership page]" caption="Shareholding, valuation, exit timeline." />
                <ImagePlaceholder label="[Rental detail page]" caption="Income rate, payout cadence, occupancy." />
              </div>
            </section>

            {/* The Process */}
            <section id="process" className="my-14">
              <p className="text-sm text-muted-foreground italic font-serif mb-1">The process</p>
              <h2 className="text-xl font-semibold mb-4">I tested with real investors, not imagined ones.</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Every decision I made was informed by watching people who had never bought a property share try to do it. Not tech-savvy early adopters — working professionals who needed to feel confident handing over real money for something they couldn't physically see. Their hesitation and confusion told me exactly what to fix. Their relief when something worked told me I was on the right track.
              </p>

              <BlockQuote author="Cribstock user, via TechCabal">
                I never thought I would be able to own a property especially in Lagos because of the high costs — Cribstock gave me that opportunity.
              </BlockQuote>

              <p className="text-muted-foreground leading-relaxed">
                I worked with 2 PMs and 6 engineers across all of this. 50+ design specs shipped. 98% accuracy — meaning engineers almost never needed to come back with clarifying questions. I treated every spec as documentation, not just a handoff. That discipline cut revision cycles in half and kept us moving fast.
              </p>
            </section>

            {/* The Impact */}
            <section id="impact" className="my-14">
              <p className="text-sm text-muted-foreground italic font-serif mb-1">The impact</p>
              <h2 className="text-xl font-semibold mb-6">The numbers that came out the other side.</h2>

              <div className="grid grid-cols-3 gap-4">
                <InsightCard value="80%" label="Faster property sell-out after presale revamp" highlighted />
                <InsightCard value="₦500M+" label="Investments managed on the revamped dashboard" highlighted />
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
                  <strong className="font-semibold text-foreground">Transparency is a conversion tool.</strong> Every time I made information more visible — live inventory, deal valuations, income breakdowns — investors responded. Trust and urgency aren't opposites. Showing people the real picture made them more likely to act, not less.
                </LearningItem>
                <LearningItem number="2">
                  <strong className="font-semibold text-foreground">New features compound existing problems.</strong> Adding the presale tracker without fixing the purchase flow would have just created a new drop-off point. The order mattered: fix the broken flow first, then build the new thing on top of solid ground.
                </LearningItem>
                <LearningItem number="3">
                  <strong className="font-semibold text-foreground">Working with engineers daily made my specs better.</strong> 98% accuracy didn't come from me being more careful — it came from me asking engineers questions every day. Understanding their constraints earlier meant fewer surprises at handoff.
                </LearningItem>
                <LearningItem number="4">
                  <strong className="font-semibold text-foreground">The "upcoming" page changed investor behaviour before launch day.</strong> Getting investors thinking about a deal in advance — days or weeks before it opened — meant that by the time the presale started, they already had conviction. That pre-warming was probably half of the conversion lift.
                </LearningItem>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-foreground text-background rounded-xl p-10 my-16 text-center">
              <h3 className="text-xl font-semibold mb-3 text-background">Want to work together?</h3>
              <p className="text-background/75 text-sm leading-relaxed">
                I am open to product design opportunities. Reach out at <a href="mailto:ovie@shipwithai.com" className="text-background underline">ovie@shipwithai.com</a>.
              </p>
            </div>

            {/* Footer */}
            <footer className="py-6 border-t border-border mt-8">
              <p className="text-xs text-muted-foreground text-center">
                Case study: Cribstock, Lagos, Nigeria, 2025
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
