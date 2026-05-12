import { CaseStudyClient } from './CaseStudyClient';

const caseStudies = {
  'treepz': {
    title: 'Treepz Super App: Unifying Fragmented Mobility Solutions',
    description: 'How we unified four fragmented mobility apps into a single wallet-powered experience across four African markets, driving 42% user growth and 89% wallet engagement.',
    date: '13 Mar 2025',
    tags: ['case study', 'product design', 'mobile app'],
    sectionImages: {
      'TL;DR': '/projects/treepz/tldr.png',
      'The Problem': '/projects/treepz/problem.png',
      'How We Conducted Research': '/projects/treepz/research.png',
      'Solution and Opportunity': '/projects/treepz/solution.png',
      'Outcomes': '/projects/treepz/outcomes.png',
    },
    content: `
## TL;DR

As a Senior Product Designer, I identified critical UX fragmentation across Treepz's mobility services. My research and strategic recommendations earned me a promotion to Product Design Lead, where I guided our team (2 designers, 1 UX writer) to create a unified super-app starting with our two core services: Business Treepz (B2B employee transportation) and Car Rental. Together, we delivered this transformation in a 3-month design and development cycle.

## The Problem

A year after joining Treepz as a Product Designer, I discovered a critical problem across West and East Africa's mobility ecosystem. Commuters, corporate clients, event organizers, and travelers were juggling multiple fragmented platforms for their transportation needs: daily work commutes, employee transportation management, special event vehicle rentals, and airport transfers.

Through user interviews and data analysis, we found that 67% of our corporate clients were using 2-3 different transportation apps for their various needs. Event organizers spent an average of 45 minutes comparing services across platforms before making booking decisions.

## How We Conducted Research

We analyzed data from Nigeria, Ghana, Uganda, and Kenya to identify four mobile-first groups: Daily Commuters, B2B Decision Makers, Event Organizers, and Airport Travelers. Each group had distinct priorities like reliability, cost control, service variety, and real-time tracking.

Key insights from our research:
- 73% of HR managers wanted a single dashboard for all employee transportation
- Event organizers spent 2.5x longer on bookings due to platform switching
- 68% users preferred wallet-based payments over per-ride transactions
- Cross-selling opportunities existed in 84% of our B2B client base

## Solution and Opportunity

Our team's vision was a comprehensive four-service mobility super-app covering Daily commutes, Business employee transport, Car rentals, and Airport transfers. However, for Phase 1, we focused on implementing Business Treepz (B2B employee transportation) and Car Rental (event-based vehicle hire).

The Phase 1 goal was to design a system where:
- Employees could check in and out for work commutes seamlessly via mobile app
- HR teams could monitor employee transportation via Business Admin dashboard
- Event organizers could browse, book, and pay for rental vehicles in one flow
- Our ops team could manage B2B contracts, rental fleet from the comprehensive Treepz Admin

## Outcomes

- B2B clients across 4 countries: 5 → 15 companies (+200%)
- Monthly employee commutes: 8K → 94K (+1075%)
- Engineering effort per new feature: -28% (shared design system)
    `
  },
  'fintech-dashboard': {
    title: 'Fintech Dashboard: Financial Analytics Platform',
    description: 'A comprehensive SaaS platform for financial analytics with real-time data visualization and reporting tools.',
    date: '15 Feb 2025',
    tags: ['case study', 'product design', 'web app'],
    sectionImages: {
      'TL;DR': '/projects/fintech/tldr.png',
      'The Problem': '/projects/fintech/problem.png',
      'Solution': '/projects/fintech/solution.png',
      'Outcomes': '/projects/fintech/outcomes.png',
    },
    content: `
## TL;DR

Designed and built a comprehensive fintech dashboard that enabled financial institutions to visualize and analyze transaction data in real-time.

## The Problem

Financial analysts were spending hours manually compiling reports from multiple data sources, leading to delayed insights and decision-making.

## Solution

Created an intuitive dashboard with:
- Real-time data visualization
- Customizable report builder
- Automated report scheduling
- Role-based access controls

## Outcomes

- Reduced report generation time by 75%
- Increased user engagement by 45%
- Improved data-driven decisions across the organization
    `
  },
};

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = caseStudies[slug as keyof typeof caseStudies];

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Project not found</h1>
          <a href="/" className="text-muted-foreground hover:underline">
            ← Back to home
          </a>
        </div>
      </div>
    );
  }

  return <CaseStudyClient caseStudy={caseStudy} />;
}