import { CaseStudyClient } from './CaseStudyClient';
import { BringGoodsCaseStudy } from './BringGoodsCaseStudy';

const caseStudies = {
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

  if (slug === 'bringgoods') {
    return <BringGoodsCaseStudy />;
  }

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
