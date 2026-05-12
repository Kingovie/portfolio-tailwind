"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { Moon, Sun, SpeakerHigh, SpeakerSlash, Envelope, TwitterLogo, LinkedinLogo, DribbbleLogo, ArrowRight, CaretRight, SquaresFour, SealCheck } from "@phosphor-icons/react";
import { Tooltip } from "./components/Tooltip";
import { cn } from "@/lib/utils";

const portfolioData = {
  name: "Your Name",
  role: "Product Designer",
  bio: "Designing interfaces and interactions that feel simple, clear, and enjoyable. Currently building at [Company]. Previously at [Company].",
  currentRole: {
    company: "Company Name",
    url: "https://example.com",
  },
  featured: [
    { name: "Project One", description: "Flagship product redesign that improved user retention by 40%", url: "#" },
    { name: "Project Two", description: "Design system used by 50+ engineers and designers", url: "#" }
  ],
  projects: [
    { name: "Treepz Super App", category: "Mobile App", description: "Super app unifying 4 mobility services", slug: "treepz" },
    { name: "Fintech Dashboard", category: "Web App", description: "SaaS platform for financial analytics", slug: "fintech-dashboard" },
    { name: "Health Tracker", category: "Mobile App", description: "iOS/Android fitness tracking application", slug: null },
    { name: "Design System", category: "Systems", description: "Component library with 100+ components", slug: null }
  ],
  writing: [
    { title: "How I approach design systems", date: "Jan 2026", url: "#" },
    { title: "Lessons from shipping 10 products", date: "Dec 2025", url: "#" },
    { title: "The future of UI design with AI", date: "Nov 2025", url: "#" }
  ],
  social: {
    email: "hello@yourname.com",
    twitter: "yourhandle",
    linkedin: "yourname",
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
    <div className="max-w-2xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="mb-16">
        {/* Profile Image */}
        <div className="relative w-[62px] h-[62px] mb-5">
          <div className="w-full h-full rounded-2xl overflow-hidden bg-secondary">
            {/* Replace with your profile image - uncomment below and add src */}
            {/* <Image src="/your-photo.jpg" alt="Profile" fill className="object-cover" /> */}
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl">
              {/* Initials or placeholder */}
              {/* <Image src="/your-photo.jpg" alt="Profile" width={80} height={80} className="object-cover" /> */}
            </div>
          </div>
          {/* Online indicator */}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
        </div>

        {/* Name with verified badge and icons */}
        <div className="flex justify-between items-center mb-[2px]">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-foreground">{portfolioData.name}</h1>
            <SealCheck size={20} weight="fill" className="text-[#1EB8F9]" />
          </div>
          {mounted && (
            <div className="flex items-center gap-1">
              <a
                href="/work"
                className="p-2 hover:bg-secondary rounded-md transition-colors duration-150"
                aria-label="View work"
              >
                <SquaresFour size={18} weight="bold" />
              </a>
              <Tooltip content={soundMuted ? "Unmute sound" : "Mute sound"}>
                <button
                  onClick={toggleSound}
                  className="p-2 hover:bg-secondary rounded-md transition-colors duration-150"
                  aria-label={soundMuted ? "Unmute sound" : "Mute sound"}
                >
                  {soundMuted ? <SpeakerSlash size={18} weight="bold" /> : <SpeakerHigh size={18} weight="bold" />}
                </button>
              </Tooltip>
              <Tooltip content={darkMode ? "Light mode" : "Dark mode"}>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 hover:bg-secondary rounded-md transition-colors duration-150"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
                </button>
              </Tooltip>
            </div>
          )}
        </div>

        {/* Role */}
        <p className="text-muted-foreground mb-6">Product Designer</p>

        {/* Bio */}
        <p className="text-foreground max-w-md leading-relaxed mb-4">{portfolioData.bio}</p>

        {/* Now section */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Now</span>
          <a 
            href={portfolioData.currentRole.url} 
            className="text-foreground hover:underline decoration-muted-foreground/50 underline-offset-4 transition-all duration-150"
          >
            {portfolioData.currentRole.company}
          </a>
        </div>

        </header>

      {/* Featured */}
      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">Featured</h2>
        <div className="space-y-1">
          {portfolioData.featured.map((project, index) => (
            <Link
              key={index}
              href={project.url}
              className="flex items-center justify-between py-3 group cursor-pointer hover-lift transition-all duration-200 rounded-md -mx-3 px-3 hover:bg-secondary/50"
            >
              <span className="font-medium group-hover:text-primary transition-colors duration-150">{project.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-150">{project.description}</span>
                <CaretRight 
                  size={14} 
                  className="text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" 
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">Projects</h2>
        <div className="grid grid-cols-2 gap-6">
          {portfolioData.projects.map((project, index) => (
            <Link
              key={index}
              href={project.slug ? `/work/${project.slug}` : '#'}
              className="group block hover-lift transition-transform duration-200"
            >
              <div className="aspect-video bg-secondary rounded-md mb-4 group-hover:bg-muted transition-colors duration-200" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                {project.category}
              </span>
              <span className="font-medium block mb-1 group-hover:text-primary transition-colors duration-150">{project.name}</span>
              <span className="text-muted-foreground text-sm">{project.description}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Writing */}
      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">Writing</h2>
<div className="space-y-1">
            {portfolioData.writing.map((article, index) => (
              <a
                key={index}
                href={article.url}
                className="flex items-center justify-between py-3 group cursor-pointer hover-lift transition-all duration-200 rounded-md -mx-3 px-3 hover:bg-secondary/50"
              >
              <span className="font-medium group-hover:text-primary transition-colors duration-150">{article.title}</span>
              <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-150">{article.date}</span>
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
            href={`https://twitter.com/${portfolioData.social.twitter}`} 
            target="_blank" 
            rel="noopener"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <TwitterLogo size={16} weight="bold" />
            <span>twitter</span>
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