export interface ProjectScreen {
  src: string;
  caption: string;
  type?: 'image' | 'video';
}

export interface Project {
  title: string;
  description: string;
  category: string;
  screens: ProjectScreen[];
  link?: string;
  year: string;
}

export const projects: Project[] = [
  {
    title: "Fintech Dashboard",
    description: "SaaS platform for financial analytics",
    category: "Web App",
    year: "2025",
    link: "#",
    screens: [
      { src: "/projects/fintech/dashboard.png", caption: "Main Dashboard", type: "image" },
      { src: "/projects/fintech/analytics.png", caption: "Analytics View", type: "image" },
      { src: "/projects/fintech/transactions.png", caption: "Transactions", type: "image" },
      { src: "/projects/fintech/reports.png", caption: "Reports", type: "image" },
    ]
  },
  {
    title: "Health Tracker",
    description: "iOS/Android fitness tracking application",
    category: "Mobile App",
    year: "2025",
    link: "#",
    screens: [
      { src: "/projects/health/home.png", caption: "Home Screen", type: "image" },
      { src: "/projects/health/workout.png", caption: "Workout Tracking", type: "image" },
      { src: "/projects/health/stats.png", caption: "Statistics", type: "image" },
      { src: "/projects/health/profile.png", caption: "Profile", type: "image" },
    ]
  },
  {
    title: "Design System",
    description: "Component library with 100+ components",
    category: "Systems",
    year: "2024",
    link: "#",
    screens: [
      { src: "/projects/design-system/colors.png", caption: "Color System", type: "image" },
      { src: "/projects/design-system/typography.png", caption: "Typography", type: "image" },
      { src: "/projects/design-system/components.png", caption: "Components", type: "image" },
      { src: "/projects/design-system/patterns.png", caption: "Patterns", type: "image" },
    ]
  },
];

export const projectCategories = [...new Set(projects.map(p => p.title))] as const;