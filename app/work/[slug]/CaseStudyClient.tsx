'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar } from '@phosphor-icons/react';

interface SectionImages {
  [key: string]: string;
}

interface CaseStudyData {
  title: string;
  description: string;
  date: string;
  tags: string[];
  sectionImages?: SectionImages;
  content: string;
}

interface CaseStudyClientProps {
  caseStudy: CaseStudyData;
}

export function CaseStudyClient({ caseStudy }: CaseStudyClientProps) {
  const [activeHeading, setActiveHeading] = useState('');
  const [headings, setHeadings] = useState<string[]>([]);
  const headingRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const h2Elements = document.querySelectorAll('.post-content h2');
    const extractedHeadings = Array.from(h2Elements).map(h => h.textContent || '');
    setHeadings(extractedHeadings);
    
    h2Elements.forEach((h, i) => {
      h.id = `heading-${i}`;
    });

    const handleScroll = () => {
      const h2s = document.querySelectorAll('.post-content h2') as NodeListOf<HTMLElement>;
      let current = '';
      
      for (let i = 0; i < h2s.length; i++) {
        const rect = h2s[i].getBoundingClientRect();
        if (rect.top <= 120) {
          current = `heading-${i}`;
        }
      }
      
      if (!current && h2s.length > 0) {
        current = 'heading-0';
      }
      
      setActiveHeading(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentSection = '';
    let sectionContent: string[] = [];

    const flushSection = () => {
      if (sectionContent.length > 0) {
        elements.push(
          <div key={`section-${currentSection}`} className="mb-6">
            {sectionContent.map((line, i) => {
              const trimmed = line.trim();
              if (trimmed.startsWith('- ')) {
                return <li key={i}>{trimmed.replace('- ', '')}</li>;
              }
              if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                return <strong key={i}>{trimmed.replace(/\*\*/g, '')}</strong>;
              }
              if (trimmed.match(/^\d+\.\s/)) {
                return <li key={i}>{trimmed.replace(/^\d+\.\s/, '')}</li>;
              }
              if (trimmed === '') return <br key={i} />;
              return <p key={i}>{trimmed}</p>;
            })}
          </div>
        );
        
        const sectionImage = caseStudy.sectionImages?.[currentSection];
        if (sectionImage) {
          elements.push(
            <div 
              key={`image-${currentSection}`}
              className="relative rounded-lg overflow-hidden border border-border bg-secondary my-8"
              style={{ aspectRatio: '16/9', maxHeight: '500px' }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <span className="text-sm">{sectionImage}</span>
              </div>
            </div>
          );
        }
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('## ')) {
        flushSection();
        currentSection = trimmed.replace('## ', '');
        sectionContent = [];
        elements.push(<h2 key={index}>{currentSection}</h2>);
      } else {
        sectionContent.push(line);
      }
    });

    flushSection();
    return elements;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <nav className="sticky top-12">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} weight="bold" />
              Back to home
            </Link>
            
            <nav className="mt-8">
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Contents</h3>
              <ul className="space-y-3">
                {headings.map((heading, index) => (
                  <li key={index}>
                    <a 
                      href={`#heading-${index}`}
                      className={`text-sm transition-colors block ${
                        activeHeading === `heading-${index}` 
                          ? 'text-foreground font-medium' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-2xl">
          <article>
            {/* Header */}
            <header className="mb-12">
              <Link 
                href="/" 
                className="lg:hidden flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft size={16} weight="bold" />
                Back to home
              </Link>
              
              <h1 className="text-3xl font-semibold mb-4">{caseStudy.title}</h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-2">
                  <Calendar size={16} weight="bold" />
                  {caseStudy.date}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {caseStudy.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Content */}
            <div className="post-content prose prose-neutral dark:prose-invert max-w-none">
              {renderContent(caseStudy.content)}
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}