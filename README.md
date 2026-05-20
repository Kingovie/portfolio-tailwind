# Portfolio - Product Designer

A product designer portfolio built with Next.js 15, Tailwind CSS, and Phosphor Icons.

## Features

### Profile Section
- Rounded profile image (62x62px) with inner glow effect on online status indicator
- Name with verified badge (SealCheck icon in #1EB8F9)
- Role "Product Designer" with tight spacing
- Bio with optimized width for readability
- "Previously at" section with company name and animated logo placeholder
- **Get in touch** button — primary filled pill button that opens mailto link with pre-filled subject

### Interactive Elements
- **Sound Toggle**: Click sound on/off with tooltip ("Mute sound" / "Unmute sound")
- **Theme Toggle**: Dark/light mode switch with tooltip ("Light mode" / "Dark mode")
- **Work Icon**: Navigate to work page
- All icons in header with rounded-lg hover states

### Project Cards
- Horizontal card layout (image left, content right) with vertical list view
- Grid view toggle (list/grid icons) on the Projects header
- Colored placeholder frames for project thumbnails
- Project name, 3-line description, "View case study →" link
- "Coming soon" label for projects without case studies
- Hover scale animation on cards
- Responsive: stacks vertically on mobile

### UI States & Polish
- Rounded-lg corners on all interactive elements
- Smooth transitions (300ms ease-out) on hover states
- Company logo rotates 16° on hover
- Featured and Writing sections with rounded-lg highlight on hover

### Case Studies (`/work/[slug]`)
- **BringGoods** — rich dedicated component with sidebar TOC, IntersectionObserver scroll tracking, feature cards, flow diagrams, comparison table, stats cards, block quotes, CTA, and footer
- **Cribstock** — dedicated component with same structure as BringGoods, covering dashboard revamp, purchase flow optimization, live presale tracker, upcoming presales page, and co-ownership/rental pages. Includes PM quotes, insight metrics (80% faster sell-outs, ₦500M+ managed, etc.), and key takeaways
- Consistent spacing, typography, and color from the design system

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Phosphor Icons
- Web Audio API (click sounds)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the portfolio.

## Customization

Edit `app/page.tsx` to update:
- Your name, role, bio
- Current role and company
- Featured projects
- All projects with case studies
- Social links
- Project placeholder colors (in `placeholderColors` array)
- Email address in the "Get in touch" button

## Project Structure

```
portfolio-tailwind/
├── app/
│   ├── components/
│   │   ├── ClickSoundProvider.tsx   # Audio context + localStorage persistence
│   │   ├── ClickSpark.tsx           # Click spark animation effect
│   │   ├── SoundToggle.tsx          # Sound on/off button
│   │   └── Tooltip.tsx              # Hover tooltip
│   ├── data/
│   │   ├── case-studies.ts          # Case study metadata (title, tags, dates)
│   │   └── projects.ts             # Project listing data
│   ├── hooks/
│   │   └── useClickSound.ts        # Web Audio API hook
│   ├── work/
│   │   ├── page.tsx                # Work listing page
│   │   └── [slug]/
│   │       ├── page.tsx            # Routes bringgoods/cribstock → dedicated components
│   │       ├── BringGoodsCaseStudy.tsx  # Rich case study with sidebar TOC
│   │       ├── CribstockCaseStudy.tsx   # Cribstock case study with sidebar TOC
│   │       └── CaseStudyClient.tsx      # Generic markdown-like case study renderer
│   ├── globals.css                 # Tailwind + CSS custom properties
│   ├── layout.tsx                  # Root layout with ClickSoundProvider
│   └── page.tsx                    # Home page (profile, featured, projects, writing, contact)
├── lib/
│   └── utils.ts                    # cn() utility (clsx + tailwind-merge)
├── public/
│   ├── bringgoods-original.html    # Original case study HTML (reference backup)
│   ├── company-logo.jpg
│   ├── company-logo.png
│   └── profile.png
├── .gitignore
├── DESIGN.md                       # Design system documentation
├── README.md
├── STACK.md
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```