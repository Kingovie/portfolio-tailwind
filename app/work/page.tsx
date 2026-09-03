'use client';

import { useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar } from '@phosphor-icons/react';
import { playBloomSound } from '../hooks/useClickSound';

const projects = [
  {
    slug: 'bringgoods',
    title: 'BringGoods: Ultra-Fast Fresh Food Delivery',
    description: 'A three-sided marketplace connecting buyers, sellers, and riders in Lagos with price negotiation and sub-30-minute delivery.',
    date: '2025',
    tags: ['case study', 'product design', 'mobile app'],
    image: '/projects/Scene-1.png',
    status: 'in development',
    linkable: true,
  },
  {
    slug: 'cribstock',
    title: 'Cribstock: Making Property Investment Accessible',
    description: 'Revamped a real estate investment platform with a live presale tracker, redesigned dashboard, and purchase flow — driving 80% faster sell-outs.',
    date: '2023-2024',
    tags: ['case study', 'product design', 'fintech', 'revamp'],
    image: '/projects/cribstock-card.png',
    status: 'shipped',
    linkable: true,
  },
  {
    slug: 'yobulu',
    title: 'Yobulu: Unified Financial Ecosystem',
    description: 'A unified financial ecosystem that gives users access to CFD markets, cryptocurrencies, stocks, P2P trading, event-based investments, and everyday banking services.',
    date: '2025',
    tags: ['case study', 'product design', 'mobile app'],
    image: '/projects/yobulu-card.jpg',
    status: 'in development',
    linkable: false,
  },
  {
    slug: 'espee-marketplace',
    title: 'Espee Marketplace: Digital Commerce Platform',
    description: 'A digital commerce platform that allows buyers to discover products, sellers to grow their businesses, and both parties to transact using Espees (SPS).',
    date: '2026',
    tags: ['case study', 'product design', 'web app'],
    image: '/projects/espee-market-card.png',
    status: 'in development',
    linkable: false,
  },
  {
    slug: 'notchhr',
    title: 'NotchHR: Reimagining the HR Experience for Modern Teams',
    description: 'A self-initiated redesign exploring how NotchHR could communicate its product more clearly and create a more modern SaaS experience.',
    date: '2026',
    tags: ['case study', 'product design', 'ux audit'],
    image: '/projects/notchhr-card.svg',
    status: 'concept',
    linkable: true,
  },
];

export default function WorkPage() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioCtxRef.current = new AudioContext();
  }, []);

  const ensureAudio = useCallback(() => {
    if (!audioCtxRef.current) return false;
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current.state === 'running';
  }, []);

  const handleBloomHover = useCallback(() => {
    if (!ensureAudio()) return;
    playBloomSound(audioCtxRef.current!);
  }, [ensureAudio]);

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 pt-20 pb-20">
        <header className="mb-16">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to home
          </Link>
          <h1 className="text-2xl font-semibold mb-2">Work</h1>
          <p className="text-muted-foreground">
            A collection of case studies and projects I&apos;ve worked on
          </p>
        </header>

        <div className="space-y-8">
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onMouseEnter={handleBloomHover}
            >
              {project.linkable ? (
                <Link
                  href={`/work/${project.slug}`}
                  className="block group"
                >
                  <article className="border border-border rounded-xl p-5 transition-colors duration-200 hover:bg-secondary/30 hover:border-muted-foreground/20">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-5 bg-secondary">
                      <Image src={project.image} alt={project.title} fill className="object-cover" />
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium shadow-sm ${
                        project.status === 'shipped'
                          ? 'bg-emerald-500/90 text-white'
                          : project.status === 'concept'
                          ? 'bg-secondary text-muted-foreground'
                          : 'bg-amber-500/90 text-white'
                      }`}>
                        {project.status === 'shipped' ? 'Shipped' : project.status === 'concept' ? 'Concept' : 'In Development'}
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="px-4 py-2 rounded-full text-sm font-medium bg-foreground text-background shadow-sm">
                          View case study
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <ArrowRight 
                        size={20} 
                        className="shrink-0 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" 
                      />
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2 min-w-0">
                        {project.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="text-xs px-2 py-1 bg-secondary text-muted-foreground rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <span className="shrink-0 text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar size={14} weight="bold" />
                        {project.date}
                      </span>
                    </div>
                  </article>
                </Link>
              ) : (
                <article className="border border-border rounded-xl p-5 transition-colors duration-200 opacity-70">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-5 bg-secondary">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium shadow-sm ${
                      project.status === 'shipped'
                        ? 'bg-emerald-500/90 text-white'
                        : project.status === 'concept'
                        ? 'bg-secondary text-muted-foreground'
                        : 'bg-amber-500/90 text-white'
                    }`}>
                      {project.status === 'shipped' ? 'Shipped' : project.status === 'concept' ? 'Concept' : 'In Development'}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full text-sm font-medium bg-foreground text-background shadow-sm">
                        Coming soon
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-xl font-semibold">
                      {project.title}
                    </h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2 min-w-0">
                      {project.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 bg-secondary text-muted-foreground rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <span className="shrink-0 text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar size={14} weight="bold" />
                      {project.date}
                    </span>
                  </div>
                </article>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}