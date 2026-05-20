'use client';

import Link from 'next/link';
import { ArrowRight, Calendar } from '@phosphor-icons/react';

const projects = [
  {
    slug: 'bringgoods',
    title: 'BringGoods: Ultra-Fast Fresh Food Delivery',
    description: 'A three-sided marketplace connecting buyers, sellers, and riders in Lagos with price negotiation and sub-30-minute delivery.',
    date: '2025',
    tags: ['case study', 'product design', 'mobile app'],
  },
  {
    slug: 'cribstock',
    title: 'Cribstock: Making Property Investment Accessible',
    description: 'Revamped a real estate investment platform with a live presale tracker, redesigned dashboard, and purchase flow — driving 80% faster sell-outs.',
    date: '2025',
    tags: ['case study', 'product design', 'fintech', 'revamp'],
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 pt-20 pb-20">
        <header className="mb-16">
          <h1 className="text-2xl font-semibold mb-2">Work</h1>
          <p className="text-muted-foreground">
            A collection of case studies and projects I&apos;ve worked on
          </p>
        </header>

        <div className="space-y-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="block group"
            >
              <article className="border border-border rounded-lg p-6 hover:bg-secondary/30 transition-all duration-200 hover:border-muted-foreground/20">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  <ArrowRight 
                    size={20} 
                    className="shrink-0 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" 
                  />
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 bg-secondary text-muted-foreground rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar size={14} weight="bold" />
                    {project.date}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Link 
            href="/" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}