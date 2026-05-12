# Portfolio - Product Designer

A product designer portfolio built with Next.js 15, Tailwind CSS, and Phosphor Icons.

## Features

### Profile Section
- Rounded profile image (62x62px) with green online status indicator (16x16px)
- Name with verified badge (SealCheck icon in #1EB8F9)
- Role "Product Designer" with tight spacing to name
- Bio/introduction paragraph

### Interactive Elements
- **Sound Toggle**: Click sound on/off with tooltip ("Mute sound" / "Unmute sound")
- **Theme Toggle**: Dark/light mode switch with tooltip ("Light mode" / "Dark mode")
- **Work Icon**: Navigate to work page
- All icons in header with tooltips on hover

### UI Components
- Custom Tooltip component for hover labels
- Click sound effect using Web Audio API
- Hydration-safe state management

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Phosphor Icons

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

## Files

- `app/page.tsx` - Main portfolio page with profile, icons, and all sections
- `app/components/Tooltip.tsx` - Custom tooltip component
- `app/components/ClickSoundProvider.tsx` - Click sound provider
- `app/components/SoundToggle.tsx` - Sound toggle component
- `app/hooks/useClickSound.ts` - Click sound hook using Web Audio API
- `app/layout.tsx` - Root layout with ClickSoundProvider
- `lib/utils.ts` - Utility functions (cn helper)