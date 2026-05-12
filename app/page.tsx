"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Moon, Sun, SpeakerHigh, SpeakerSlash, Envelope, TwitterLogo, LinkedinLogo, DribbbleLogo, ArrowRight, CaretRight, SquaresFour, SealCheck } from "@phosphor-icons/react";
import { Tooltip } from "./components/Tooltip";
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
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <Image src="/profile.png" alt="Profile" fill className="object-cover" />
          </div>
          {/* Online indicator */}
          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background" style={{ background: 'radial-gradient(circle at 30% 30%, #4ade80, #18a855)', boxShadow: 'inset 0 0 8px rgba(255,255,255,0.3)' }}></div>
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
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Now</span>
          <a 
            href={portfolioData.currentRole.url} 
            className="text-foreground group inline-flex items-center hover:underline decoration-muted-foreground/50 underline-offset-4 transition-all duration-150"
          >
            <span className="group-hover:mr-1 transition-all duration-150">{portfolioData.currentRole.company}</span>
            <div className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center overflow-hidden group-hover:rotate-[16deg] group-hover:origin-left transition-transform duration-300 ease-out ml-2">
              {/* Add company logo here - replace with <Image src="/logo.png" alt="Logo" className="object-cover" /> */}
            </div>
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
              className="flex items-center justify-between py-3 group cursor-pointer hover-lift transition-all duration-200 rounded-lg -mx-3 px-3 hover:bg-secondary/50"
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
              <div className={`relative aspect-video rounded-lg mb-4 overflow-hidden group-hover:brightness-95 transition-all duration-200 ${placeholderColors[index % placeholderColors.length]}`}>
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
                className="flex items-center justify-between py-3 group cursor-pointer hover-lift transition-all duration-200 rounded-lg -mx-3 px-3 hover:bg-secondary/50"
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