# Design System

> This file documents the design decisions and patterns used in this portfolio.

---

## Stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 |
| Styling | Tailwind CSS |
| Components | Custom (Phosphor Icons + Radix primitives) |
| Animation | CSS transitions (lightweight) |
| Icons | Phosphor Icons (`@phosphor-icons/react`) |
| Utility | `clsx` + `tailwind-merge` via `cn()` |

---

## Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

System font stack for maximum performance and native feel.

### Type Scale

- Page titles: `text-xl font-semibold` or `text-2xl font-semibold`
- Section headings: `text-xs uppercase tracking-wider` for labels
- Body: `text-sm text-muted-foreground`
- Never use `font-bold` — use `font-semibold` or `font-medium`

---

## Color Philosophy

Light-first with dark mode support. Uses CSS custom properties for theming.

**CSS Variables (Light):**
- `--background`: hsl(0 0% 100%)
- `--foreground`: hsl(240 10% 3.9%)
- `--secondary`: hsl(240 4.8% 96%)
- `--muted-foreground`: hsl(240 3.8% 46.1%)
- `--border`: hsl(240 5.9% 90%)

**CSS Variables (Dark):**
- `--background`: hsl(240 6% 3%)
- `--foreground`: hsl(0 0% 98%)
- `--secondary`: hsl(240 4% 12%)
- `--muted-foreground`: hsl(240 5% 64.9%)
- `--border`: hsl(240 4% 16%)

**Rules:**
- Use `text-muted-foreground` for secondary text
- Use `border-border` for borders
- Never use color alone — always pair with shape or label

---

## Spacing

| Context | Value |
|---|---|
| Page container | `max-w-2xl mx-auto px-6` |
| Section gap | `mb-16` |
| Component padding | `p-4` to `p-6` |
| Gap between items | `gap-4` to `gap-6` |

---

## Border Radius

- Buttons: `rounded-md`
- Cards: `rounded-lg`
- Small elements: `rounded`
- Never use `rounded-full` unless it's a pill/badge
- Never use `rounded-2xl` or `rounded-3xl`

---

## Components

### Custom Tooltip

Wraps elements to show tooltip on hover. Positioned using fixed positioning with transform.

### ClickSoundProvider

Context provider that handles click sound effects with localStorage persistence.

### SoundToggle

Button component that toggles sound mute state.

---

## Motion

### Transitions

```css
transition: color 150ms ease, background-color 150ms ease, opacity 150ms ease, transform 150ms ease;
```

### Hover Effects

```css
.hover-lift:hover {
  transform: translateY(-2px);
}
```

### Active State

```css
button:active:not(:disabled) {
  transform: scale(0.97);
}
```

---

## Anti-Patterns

**Never do these:**
- `rounded-2xl` on buttons or inputs
- `rounded-full` on rectangular cards
- `font-bold` for labels — use `font-medium` or `font-semibold`
- `shadow-xl` on standard cards
- Border + shadow on the same element
- Content width over `max-w-2xl`

---

## File Structure

```
app/
  page.tsx          # Home page with profile, featured, projects, writing, contact
  layout.tsx        # Root layout with ClickSoundProvider
  globals.css       # Tailwind + CSS variables + custom styles
  work/
    page.tsx        # Work listing page
    [slug]/
      page.tsx      # Case study detail page
  components/
    Tooltip.tsx
    ClickSoundProvider.tsx
    SoundToggle.tsx
  data/
    projects.ts
  hooks/
    useClickSound.ts
lib/
  utils.ts          # cn() utility function
```