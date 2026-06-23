"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Moon, Sun, SpeakerHigh, SpeakerSlash, Envelope, TwitterLogo, LinkedinLogo, DribbbleLogo, ArrowRight, SquaresFour, Rows, SealCheck } from "@phosphor-icons/react";
import { Tooltip } from "./components/Tooltip";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const placeholderColors = [
  'bg-[#f0f4ff]', // soft blue
  'bg-[#fff4f0]', // soft peach
  'bg-[#f0fff4]', // soft mint
  'bg-[#fff0f8]', // soft pink
];

const portfolioData = {
  name: "Michael Ovie",
  role: "Product Designer",
  bio: "Product Designer with 3 years of hands-on experience designing for fintech, e-commerce, and proptech companies. My work has reached 17,000+ users globally and helped accelerate product sales by 40%. I focus on user research and usability testing to inform my design decisions. I enjoy solving complex problems by breaking them down into simple, intuitive experiences that people actually want to use.",
  currentRole: {
    company: "Bringgoods Engineering",
    url: "#",
  },
  featured: [
    { name: "Startsmart", role: "Side Project", description: "Flagship product redesign that improved user retention by 40%", url: "#" },
    { name: "PropertyHub", role: "Side Project", description: "Design system used by 50+ engineers and designers", url: "#" }
  ],
  projects: [
    { name: "BringGoods", category: "Mobile App", description: "A hyperlocal e-commerce platform that delivers fresh food in under 30 minutes across Lagos, Nigeria with a unique price negotiation feature.", slug: "bringgoods", image: "/projects/Scene-1.png" },
    { name: "Cribstock", category: "Web App", description: "Real estate investment platform enabling everyday Nigerians to co-own properties and earn rental income from their phones.", slug: "cribstock", image: "/projects/cribstock-card.png" },
    { name: "Yobulu", category: "Mobile App", description: "A unified financial ecosystem that gives users access to CFD markets, cryptocurrencies, stocks, P2P trading, event-based investments, and everyday banking services through a seamless experience.", slug: null, image: "/projects/yobulu-card.jpg" },
    { name: "Espee Marketplace", category: "Marketplace", description: "A digital commerce platform that allows buyers to discover products, sellers to grow their businesses, and both parties to transact using Espees (SPS).", slug: null, image: "/projects/espee-market-card.png" }
  ],
  writing: [
    { title: "Putting Ideas into Words", author: "Paul Graham", url: "https://paulgraham.com/words.html" },
    { title: "How to Cultivate Taste in the Age of Algorithms", author: "Kyle Chayka", url: "https://behavioralscientist.org/how-to-cultivate-taste-in-the-age-of-algorithms/" },
    { title: "How to Do Great Work", author: "Paul Graham", url: "https://paulgraham.com/greatwork.html" },
    { title: "The Age of Average", author: "Alex Murrell", url: "https://www.alexmurrell.co.uk/articles/the-age-of-average" },
    { title: "The Symbiotic Enterprise", author: "McKinsey", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-symbiotic-enterprise" }
  ],
  social: {
    email: "michealovie33@gmail.com",
    twitter: "im__ovie",
    linkedin: "michaelovie",
    dribbble: "yourname"
  }
};

function CaseStudy({ project, onBack }: { project: any; onBack: () => void }) {
  const cs = project.caseStudy;
  
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <button 
        onClick={onBack} 
        className="text-sm text-muted-foreground hover:text-foreground mb-12 transition-colors duration-150"
      >
        ← Back
      </button>
      
      <h1 className="text-2xl font-semibold mb-4">{project.name}</h1>
      <p className="text-muted-foreground mb-8">{cs.date}</p>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">TL;DR</h2>
          <p className="text-foreground">{cs.tlDr}</p>
        </div>
        
        <div>
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Problem</h2>
          <p className="text-muted-foreground">{cs.problem}</p>
        </div>
        
        <div>
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Solution</h2>
          <p className="text-muted-foreground">{cs.solution}</p>
        </div>
        
        {cs.sections.map((section: any) => (
          <div key={section.id}>
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">{section.title}</h2>
            <p className="text-muted-foreground">{section.content}</p>
          </div>
        ))}
        
        {cs.quote && (
          <blockquote className="border-l-2 border-primary pl-4 italic text-foreground">
            "{cs.quote}" — {cs.author}
          </blockquote>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    setSoundMuted(localStorage.getItem('sound-muted') === 'true');
    setMounted(true);
  }, []);

  const toggleSound = () => {
    const newMuted = !soundMuted;
    setSoundMuted(newMuted);
    localStorage.setItem('sound-muted', String(newMuted));
  };

  if (selectedProject) {
    return <CaseStudy project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 md:py-20">
      {/* Header */}
      <header className="mb-16">
        {/* Profile Image */}
        <div className="relative w-[62px] h-[62px] mb-5 group cursor-pointer">
          <div className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:brightness-105 group-hover:shadow-lg">
            <Image src="/profile.png" alt="Profile" fill className="object-cover" />
          </div>
          {/* Online indicator */}
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-background" style={{ background: 'radial-gradient(circle at 30% 30%, #4ade80, #18a855)', boxShadow: 'inset 0 0 8px rgba(255,255,255,0.3)' }}></div>
        </div>

        {/* Name with verified badge and icons */}
        <div className="flex justify-between items-center mb-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">{portfolioData.name}</h1>
            <SealCheck size={20} weight="fill" className="text-[#1EB8F9]" />
          </div>
          {mounted && (
            <div className="flex items-center gap-1">
              <a
                href="/work"
                className="p-2 hover:bg-secondary rounded-lg transition-colors duration-150"
                aria-label="View work"
              >
                <SquaresFour size={18} weight="bold" />
              </a>
              <Tooltip content={soundMuted ? "Unmute sound" : "Mute sound"}>
                <button
                  onClick={toggleSound}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors duration-150"
                  aria-label={soundMuted ? "Unmute sound" : "Mute sound"}
                >
                  {soundMuted ? <SpeakerSlash size={18} weight="bold" /> : <SpeakerHigh size={18} weight="bold" />}
                </button>
              </Tooltip>
              <Tooltip content={darkMode ? "Light mode" : "Dark mode"}>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors duration-150"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
                </button>
              </Tooltip>
            </div>
          )}
        </div>

        {/* Role */}
        <p className="text-muted-foreground mb-4">Product Designer</p>

        {/* Bio */}
        <p className="text-foreground max-w-xl leading-relaxed mb-3">Product Designer with over 3 years of experience in fintech, e-commerce, and proptech. My designs have reached 17,000+ users and boosted product sales by 40%. I combine user research with usability testing to create simple, intuitive experiences that drive results.</p>

        {/* Now section */}
        <div className="flex items-center gap-2 mt-4 mb-8">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">previously at</span>
          <a 
            href={portfolioData.currentRole.url} 
            className="text-foreground group inline-flex items-center hover:underline decoration-muted-foreground/50 underline-offset-4 transition-all duration-150"
          >
            <span className="group-hover:mr-1 transition-all duration-150">{portfolioData.currentRole.company}</span>
            <div className="relative w-5 h-5 rounded-lg bg-secondary flex items-center justify-center overflow-hidden group-hover:rotate-[16deg] group-hover:origin-left transition-transform duration-300 ease-out ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Image src="/company-logo.jpg" alt="Company Logo" width={20} height={20} className="object-contain" />
            </div>
          </a>
        </div>

        <div className="flex flex-row items-center gap-3 mb-12">
          <a
            href="mailto:michaelovie33@gmail.com?subject=Hey Michael"
            className="group h-10 bg-foreground text-background px-6 rounded-full shadow-lg relative overflow-hidden cursor-pointer active:scale-[0.97] transition-all"
          >
            <div className="h-[80px] flex flex-col items-center transition-transform duration-100 ease-out group-hover:-translate-y-1/2">
              <div className="flex items-center justify-center gap-2 h-10 shrink-0 text-sm font-medium">
                <Envelope size={16} weight="fill" />
                <span>Get in touch</span>
              </div>
              <div className="flex items-center justify-center gap-2 h-10 shrink-0 text-sm font-medium">
                <Envelope size={16} weight="fill" />
                <span>Get in touch</span>
              </div>
            </div>
          </a>
          <a
            href="https://drive.google.com/file/d/1r074gF9VtAJ1HgBFYJSX1mcQoQWoufmD/view"
            target="_blank" rel="noopener noreferrer"
          className="group h-10 bg-muted-foreground/15 text-foreground/80 px-6 rounded-full relative overflow-hidden cursor-pointer active:scale-[0.97] transition-all"
          >
            <div className="h-[80px] flex flex-col items-center transition-transform duration-100 ease-out group-hover:-translate-y-1/2">
              <div className="flex items-center justify-center h-10 shrink-0 text-sm font-medium">
                <span>Resume</span>
              </div>
              <div className="flex items-center justify-center h-10 shrink-0 text-sm font-medium">
                <span>Resume</span>
              </div>
            </div>
          </a>
        </div>

        </header>

      {/* Featured */}
      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">Ideas in Motion — Personal Projects</h2>
        <div className="space-y-3">
          {portfolioData.featured.map((project, index) => (
            <Link
              key={index}
              href={project.url}
              className="flex items-start gap-4 p-4 rounded-2xl border border-border hover:border-muted-foreground/20 hover:bg-secondary/50 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary shrink-0 flex items-center justify-center text-lg font-semibold text-muted-foreground">
                {project.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-foreground">{project.name}</span>
                  <span className="text-muted-foreground/40">·</span>
                  <span className="text-sm text-muted-foreground">{project.role}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{project.description}</p>
              </div>
              <ArrowRight 
                size={16} 
                className="text-muted-foreground mt-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" 
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs uppercase tracking-wider text-muted-foreground">Projects</h2>
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Rows size={16} weight="bold" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <SquaresFour size={16} weight="bold" />
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="flex flex-col gap-6 sm:gap-8">
            {portfolioData.projects.map((project, index) => {
              const card = (
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative bg-card border border-border rounded-xl p-4 sm:p-5 transition-colors duration-200 hover:bg-secondary/50 hover:border-muted-foreground/20 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono text-muted-foreground/60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg font-semibold mt-1">{project.name}</h3>
                    </div>
                    <div className="shrink-0">
                      {project.slug ? (
                        <Link
                          href={`/work/${project.slug}`}
                          className="shrink-0 inline-flex items-center px-4 py-1.5 bg-secondary text-muted-foreground rounded-full text-xs font-medium hover:text-foreground hover:bg-secondary/80 active:scale-95 transition-all"
                        >
                          View case study
                        </Link>
                      ) : (
                        <span className="shrink-0 inline-flex items-center px-4 py-1.5 bg-secondary text-muted-foreground/40 rounded-full text-xs font-medium">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    {project.description}
                  </p>

                  <hr className="border-border my-6" />

                  <div className={`relative w-full aspect-[3/2] sm:aspect-[4/3] max-h-[200px] sm:max-h-[300px] rounded-lg overflow-hidden ${project.image ? '' : placeholderColors[index % placeholderColors.length]}`}>
                    {project.image && (
                      <Image src={project.image} alt={project.name} fill className="object-cover" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <span className={`px-5 py-2 rounded-full text-sm font-medium shadow-sm ${
                        project.slug
                          ? 'bg-foreground text-background'
                          : 'bg-secondary text-foreground border border-border'
                      }`}>
                        {project.slug ? 'View Case Study' : 'Coming soon'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );

              return project.slug ? (
                <Link key={index} href={`/work/${project.slug}`} className="block">
                  {card}
                </Link>
              ) : (
                <div key={index} className="block cursor-default">
                  {card}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {portfolioData.projects.map((project, index) => (
              <Link
                key={index}
                href={project.slug ? `/work/${project.slug}` : '#'}
                className="group block transition-transform duration-200"
              >
                <div className={`relative aspect-video rounded-lg mb-4 overflow-hidden transition-all duration-200 ${project.image ? '' : placeholderColors[index % placeholderColors.length]}`}>
                  {project.image && (
                    <Image src={project.image} alt={project.name} fill className="object-cover" />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="px-2 py-1 text-xs bg-foreground text-background rounded-lg">
                      View work
                    </span>
                  </span>
                </div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  {project.category}
                </span>
                <span className="font-medium block mb-1 group-hover:text-primary transition-colors duration-150">{project.name}</span>
                <span className="text-muted-foreground text-sm">{project.description.length > 80 ? project.description.slice(0, 80) + '...' : project.description}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Writing */}
      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">Interesting Reads</h2>
<div className="space-y-1">
            {portfolioData.writing.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 group cursor-pointer hover-lift transition-all duration-200 rounded-lg -mx-3 px-3 hover:bg-secondary/50"
              >
              <span className="font-medium group-hover:text-primary transition-colors duration-150 truncate min-w-0">{article.title}</span>
              <span className="shrink-0 text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-150 ml-4">{article.author}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section>
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">Connect</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a 
            href={`mailto:${portfolioData.social.email}`} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <Envelope size={16} weight="bold" />
            <span>{portfolioData.social.email}</span>
          </a>
          <a 
            href={`https://x.com/${portfolioData.social.twitter}`} 
            target="_blank" 
            rel="noopener"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <TwitterLogo size={16} weight="bold" />
            <span>x</span>
          </a>
          <a 
            href={`https://linkedin.com/in/${portfolioData.social.linkedin}`} 
            target="_blank" 
            rel="noopener"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <LinkedinLogo size={16} weight="bold" />
            <span>linkedin</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">© 2026 {portfolioData.name}</p>
      </footer>
    </div>
  );
}