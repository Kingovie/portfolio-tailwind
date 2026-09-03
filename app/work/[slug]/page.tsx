import dynamic from 'next/dynamic';

const BringGoodsCaseStudy = dynamic(() => import('./BringGoodsCaseStudy').then(m => m.BringGoodsCaseStudy));
const CribstockCaseStudy = dynamic(() => import('./CribstockCaseStudy').then(m => m.CribstockCaseStudy));
const EspeeCaseStudy = dynamic(() => import('./EspeeCaseStudy').then(m => m.EspeeCaseStudy));
const YobuluCaseStudy = dynamic(() => import('./YobuluCaseStudy').then(m => m.YobuluCaseStudy));
const NotchHRCaseStudy = dynamic(() => import('./NotchHRCaseStudy').then(m => m.NotchHRCaseStudy));

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === 'bringgoods') {
    return <BringGoodsCaseStudy />;
  }

  if (slug === 'cribstock') {
    return <CribstockCaseStudy />;
  }

  if (slug === 'espee-marketplace') {
    return <EspeeCaseStudy />;
  }

  if (slug === 'yobulu') {
    return <YobuluCaseStudy />;
  }

  if (slug === 'notchhr') {
    return <NotchHRCaseStudy />;
  }

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
