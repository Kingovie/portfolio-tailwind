'use client';

import React, { useEffect, useState, useRef } from 'react';
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

  const renderInline = (text: string) => {
    if (!text || !text.includes('**')) return text;
    const segments = text.split(/\*\*/);
    const parts: React.ReactNode[] = [];
    for (let i = 0; i < segments.length; i++) {
      if (i % 2 === 1) {
        parts.push(<strong key={i}>{segments[i]}</strong>);
      } else {
        parts.push(segments[i]);
      }
    }
    return parts;
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentSection = '';
    let sectionContent: string[] = [];
    let imageShownForSection = '';

    const renderFlowDiagram = (flowType: string, steps: string[]) => {
      const colors: Record<string, string> = {
        'Buyer Flow': 'bg-emerald-500',
        'Seller Flow': 'bg-blue-500',
        'Rider Flow': 'bg-orange-500',
      };
      const color = colors[flowType] || 'bg-primary';
      
      return (
        <div key={flowType} className="my-6 p-4 bg-secondary/50 rounded-xl border border-border">
          <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">{flowType}</h4>
          <div className="flex flex-wrap items-center gap-2">
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <span className={`${color} text-white px-3 py-1.5 rounded-full text-xs font-medium`}>
                  {step}
                </span>
                {i < steps.length - 1 && (
                  <span className="text-muted-foreground text-sm">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    };

    const renderTable = (tableContent: string) => {
      const lines = tableContent.split('\n').filter(l => l.trim());
      if (lines.length < 2) return null;
      
      const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
      const rows = lines.slice(2).map(row => 
        row.split('|').map(cell => cell.trim()).filter(c => c)
      );
      
      return (
        <div className="overflow-x-auto my-4 border border-border rounded-lg bg-background">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                {headers.map((header, i) => (
                  <th key={i} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-sm">{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    const renderQuote = (quoteText: string) => {
      return (
        <div className="my-4 p-5 bg-secondary/50 border-l-4 border-primary rounded-r-lg">
          <p className="text-foreground italic text-base leading-relaxed">"{quoteText.replace(' — ', ' — ')}"</p>
        </div>
      );
    };

    const flushSection = (showImage: boolean = true) => {
      if (sectionContent.length > 0) {
        const contentText = sectionContent.join('\n');
        
        const tableMatch = contentText.match(/\|.+\|.+\|.+\|/);
        if (tableMatch) {
          const tableLines = contentText.split('\n').filter(l => l.includes('|'));
          const beforeTable = contentText.substring(0, contentText.indexOf(tableLines[0])).trim();
          const tableContent = tableLines.join('\n');
          const afterTable = contentText.substring(contentText.indexOf(tableLines[tableLines.length - 1]) + tableLines[tableLines.length - 1].length).trim();
          
          if (beforeTable) {
            elements.push(
              <div key={`text-${currentSection}`} className="mb-2">
                {beforeTable.split('\n').map((line, i) => {
                  const trimmed = line.trim();
                  if (!trimmed) return <br key={i} />;
                  if (trimmed.startsWith('- ')) return <li key={i} className="ml-4">{renderInline(trimmed.replace('- ', ''))}</li>;
                  return <p key={i}>{renderInline(trimmed)}</p>;
                })}
              </div>
            );
          }
          
          elements.push(renderTable(tableContent));
          
          const quoteMatch = afterTable.match(/"[^"]+".*—/);
          if (quoteMatch) {
            const quoteText = quoteMatch[0];
            elements.push(renderQuote(quoteText));
          }
        } else {
          const quoteMatch = contentText.match(/"[^"]+".*—/);
          if (quoteMatch) {
            const beforeQuote = contentText.substring(0, contentText.indexOf(quoteMatch[0])).trim();
            const quoteText = quoteMatch[0];
            
            if (beforeQuote) {
              elements.push(
                <div key={`text-${currentSection}`} className="mb-2">
                  {beforeQuote.split('\n').map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return <br key={i} />;
                    if (trimmed.startsWith('- ')) return <li key={i} className="ml-4">{renderInline(trimmed.replace('- ', ''))}</li>;
                    return <p key={i}>{renderInline(trimmed)}</p>;
                  })}
                </div>
              );
            }
            
            elements.push(renderQuote(quoteText));
          } else {
            elements.push(
              <div key={`section-${currentSection}`} className="mb-6">
                {sectionContent.map((line, i) => {
                  const trimmed = line.trim();
                  if (trimmed.startsWith('- ')) {
                    return <li key={i} className="ml-4">{renderInline(trimmed.replace('- ', ''))}</li>;
                  }
                  if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                    return <strong key={i}>{trimmed.replace(/\*\*/g, '')}</strong>;
                  }
                  if (trimmed.match(/^\d+\.\s/)) {
                    return <li key={i} className="ml-4">{renderInline(trimmed.replace(/^\d+\.\s/, ''))}</li>;
                  }
                  if (trimmed === '') return <br key={i} />;
                  if (trimmed.includes('Flow:')) return null;
                  return <p key={i}>{renderInline(trimmed)}</p>;
                })}
              </div>
            );
          }
        }

        if (contentText.includes('Buyer Flow:')) {
          const flowMatch = contentText.match(/Buyer Flow:\s*(.+?)(?=\n\n|$)/);
          if (flowMatch) {
            const steps = flowMatch[1].split('→').map(s => s.trim());
            elements.push(renderFlowDiagram('Buyer Flow', steps));
          }
        }
        
        if (contentText.includes('Seller Flow:')) {
          const flowMatch = contentText.match(/Seller Flow:\s*(.+?)(?=\n\n|$)/);
          if (flowMatch) {
            const steps = flowMatch[1].split('→').map(s => s.trim());
            elements.push(renderFlowDiagram('Seller Flow', steps));
          }
        }
        
        if (contentText.includes('Rider Flow:')) {
          const flowMatch = contentText.match(/Rider Flow:\s*(.+?)(?=\n\n|$)/);
          if (flowMatch) {
            const steps = flowMatch[1].split('→').map(s => s.trim());
            elements.push(renderFlowDiagram('Rider Flow', steps));
          }
        }
        
        if (showImage) {
          const sectionImage = caseStudy.sectionImages?.[currentSection];
          if (sectionImage && imageShownForSection !== currentSection) {
            imageShownForSection = currentSection;
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
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('## ')) {
        flushSection();
        currentSection = trimmed.replace('## ', '');
        sectionContent = [];
        elements.push(<h2 key={index} className="text-xl font-semibold mt-8 mb-4">{currentSection}</h2>);
      } else if (trimmed.startsWith('### ')) {
        flushSection(false);
        sectionContent = [];
        elements.push(<h3 key={index} className="text-lg font-semibold mt-6 mb-3">{trimmed.replace('### ', '')}</h3>);
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