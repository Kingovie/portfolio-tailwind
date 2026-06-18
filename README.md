# Portfolio - Product Designer

A product designer portfolio built with Next.js 15, Tailwind CSS, Framer Motion, and Phosphor Icons.

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
- Framer Motion animations (page transitions, card reveals, slider transitions)

### Case Studies (`/work/[slug]`)
Both case studies are rich, dedicated components that share a consistent design system:

- **Feature cards**: Small cards with icon, title, and description for highlighting key features
- **Image placeholders**: Gradient overlays with labels on all images matching the research presentation style
- **Block quotes**: Styled pull quotes with optional author attribution
- **CTA section**: Dark card section with a floating circular "Send a Mail" button that follows cursor via Framer Motion, large Envelope icon at 10% opacity as background decoration (mailto:miichealovie33@gmail.com)
- **Sidebar table of contents**: Right-aligned sticky TOC with IntersectionObserver-based active heading tracking
- **Image protection**: Right-click and drag disabled on all images

#### BringGoods
- Onboarding flow diagrams for buyer, seller, and rider (with step-by-step visual guides)
- Admin console and BringGoods Academy screenshots
- Comparison table and stats cards
- All flow images resized from 14544×20568px originals to 6000px max dimension for quality/filesize balance

#### Cribstock
- Dashboard revamp, purchase flow optimization, live presale tracker, upcoming presales page, co-ownership/rental pages
- **Before/after image slider**: Animated side-by-side comparison with left/right navigation arrows, carousel dot indicators, and gradient caption overlay. Desktop view (6000×4898px) and mobile view (6000×3908px) using AnimatePresence for smooth transitions
- PM quotes, insight metrics (80% faster sell-outs, ₦500M+ managed, etc.), and key takeaways
- Consistent spacing, typography, and color from the design system

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Phosphor Icons (@phosphor-icons/react)
- clsx + tailwind-merge

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
│   │       ├── CribstockCaseStudy.tsx   # Cribstock case study with sidebar TOC + slider
│   │       └── CaseStudyClient.tsx      # Generic markdown-like case study renderer
│   ├── globals.css                 # Tailwind + CSS custom properties
│   ├── layout.tsx                  # Root layout with ClickSoundProvider
│   └── page.tsx                    # Home page (profile, featured, projects, writing, contact)
├── lib/
│   └── utils.ts                    # cn() utility (clsx + tailwind-merge)
├── public/
│   ├── projects/                   # Case study images
│   │   ├── Admin console.png
│   │   ├── Before and after.png
│   │   ├── Bringgood Academy.png
│   │   ├── Buyers Flow - Onboarding.png
│   │   ├── Mobile before and after.png
│   │   ├── Rider Flow - Onboarding.png
│   │   ├── Sellers Flow - Onboarding.png
│   │   └── ...
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