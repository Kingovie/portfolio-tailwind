import dynamic from 'next/dynamic';

const BringGoodsCaseStudy = dynamic(() => import('./BringGoodsCaseStudy').then(m => m.BringGoodsCaseStudy));
const CribstockCaseStudy = dynamic(() => import('./CribstockCaseStudy').then(m => m.CribstockCaseStudy));

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === 'bringgoods') {
    return <BringGoodsCaseStudy />;
  }

  if (slug === 'cribstock') {
    return <CribstockCaseStudy />;
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
