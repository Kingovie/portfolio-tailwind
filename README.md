# Portfolio - Product Designer

A product designer portfolio built with Next.js 15, Tailwind CSS, and Phosphor Icons.

## Features

### Profile Section
- Rounded profile image (62x62px) with inner glow effect on online status indicator
- Name with verified badge (SealCheck icon in #1EB8F9)
- Role "Product Designer" with tight spacing
- Bio with optimized width for readability
- "Now" section with company name and animated logo placeholder

### Interactive Elements
- **Sound Toggle**: Click sound on/off with tooltip ("Mute sound" / "Unmute sound")
- **Theme Toggle**: Dark/light mode switch with tooltip ("Light mode" / "Dark mode")
- **Work Icon**: Navigate to work page
- All icons in header with rounded-lg hover states

### Project Cards
- Colored placeholder frames for project thumbnails
- "View work" tooltip appears on hover with rounded-lg corners
- Smooth brightness transition on hover
- Grid layout (2 columns)

### UI States & Polish
- Rounded-lg corners on all interactive elements
- Smooth transitions (300ms ease-out) on hover states
- Company logo rotates 16° on hover
- Featured and Writing sections with rounded-lg highlight on hover

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

## Files

- `app/page.tsx` - Main portfolio page with profile, icons, and all sections
- `app/components/Tooltip.tsx` - Custom tooltip component
- `app/components/ClickSoundProvider.tsx` - Click sound provider
- `app/components/SoundToggle.tsx` - Sound toggle component
- `app/hooks/useClickSound.ts` - Click sound hook using Web Audio API
- `app/layout.tsx` - Root layout with ClickSoundProvider
- `lib/utils.ts` - Utility functions (cn helper)