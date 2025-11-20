# CLAUDE.md - AI Assistant Guide

**Last Updated:** 2025-11-20
**Project:** StreamLine SaaS Landing Page
**Tech Stack:** Next.js 16 + React 19 + TypeScript + Tailwind CSS v4

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Codebase Structure](#codebase-structure)
3. [Development Workflow](#development-workflow)
4. [Key Conventions](#key-conventions)
5. [Component Patterns](#component-patterns)
6. [Styling Guidelines](#styling-guidelines)
7. [Form Handling](#form-handling)
8. [Routing & Navigation](#routing--navigation)
9. [Common Tasks](#common-tasks)
10. [Important Notes](#important-notes)

---

## Project Overview

This is a **Next.js 16 App Router** SaaS landing page built with v0.app that features:

- Modern marketing landing page with Hero, Features, Testimonials, Pricing, CTA sections
- Sophisticated **Pricing Estimator Calculator** with complex business logic (764 lines)
- Dark mode support via `next-themes`
- Fully responsive design with mobile-first approach
- Auto-sync with v0.app deployments
- Deployed on Vercel

**Primary Purpose:** Marketing site for "StreamLine" workflow automation SaaS with interactive pricing calculator for fund administration services.

---

## Codebase Structure

```
v0-saa-s-landing-page/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (metadata, analytics, theme)
│   ├── page.tsx                  # Homepage (composes all sections)
│   ├── globals.css               # Global styles, theme vars, custom utilities
│   └── pricing-estimator/
│       └── page.tsx              # Pricing calculator route
│
├── components/
│   ├── ui/                       # Shadcn/UI primitives (9 components)
│   │   ├── button.tsx            # Button with variants
│   │   ├── card.tsx              # Card container
│   │   ├── input.tsx             # Text input
│   │   ├── select.tsx            # Dropdown select
│   │   ├── slider.tsx            # Range slider
│   │   ├── checkbox.tsx          # Checkbox input
│   │   ├── label.tsx             # Form label
│   │   ├── tooltip.tsx           # Tooltip popup
│   │   └── avatar.tsx            # User avatar
│   │
│   ├── header.tsx                # Navigation bar with links
│   ├── hero.tsx                  # Hero section with gradient
│   ├── features.tsx              # Features grid
│   ├── testimonials.tsx          # Testimonials carousel
│   ├── pricing.tsx               # 3-tier pricing cards
│   ├── cta-section.tsx           # Call-to-action banner
│   ├── footer.tsx                # Footer with links & social
│   ├── theme-provider.tsx        # Next-themes wrapper
│   └── pricing-estimator.tsx     # Complex calculator (764 lines) ⭐
│
├── lib/
│   └── utils.ts                  # cn() helper for className merging
│
├── public/                       # Static assets (images, logos)
│
└── Configuration files
    ├── package.json              # Dependencies & scripts
    ├── tsconfig.json             # TypeScript config (strict mode)
    ├── next.config.mjs           # Next.js config
    ├── postcss.config.mjs        # PostCSS for Tailwind v4
    ├── components.json           # Shadcn/UI CLI config
    └── .gitignore
```

**Total:** 22 TypeScript/TSX files

---

## Development Workflow

### Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint code
npm run lint
```

### Git Branch Workflow

**Current Branch:** `claude/claude-md-mi81n27plvv3jg0z-01GLyKqBo1y5WL98DJrXSEVs`

**Important Rules:**
- All development happens on `claude/*` prefixed branches
- Branch must end with session ID for push authentication
- Use `git push -u origin <branch-name>` for pushing
- Commits should be descriptive and focused
- Never force push without explicit user permission

### v0.app Sync

This repository automatically syncs with v0.app:
- Changes deployed from v0.app are pushed to this repo
- Manual edits can be made locally and pushed
- Vercel deploys from this repository

---

## Key Conventions

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | kebab-case | `pricing-estimator.tsx` |
| UI Components | kebab-case | `button.tsx`, `card.tsx` |
| Pages | kebab-case | `page.tsx` |
| Layouts | kebab-case | `layout.tsx` |
| Utilities | kebab-case | `utils.ts` |

### Component Exports

```typescript
// PascalCase for component functions
export function PricingEstimator() { ... }
export function Header() { ... }

// Or default export for pages
export default function Home() { ... }
```

### Import Paths

```typescript
// ✅ Use absolute imports with @ alias
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ❌ Avoid relative imports for cross-directory references
import { Button } from "../ui/button"
```

### TypeScript

- **Strict mode enabled** - All files must be type-safe
- Use Zod for runtime validation and type inference
- Prefer `interface` for object shapes
- Use `Record<K, V>` for mapped types
- React components: `React.forwardRef` for UI primitives

---

## Component Patterns

### Standard Component Structure

```typescript
// 1. Client directive (if needed)
"use client"

// 2. Imports (React first, then external, then internal)
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// 3. Types/Interfaces
interface Props {
  className?: string
}

// 4. Constants (outside component)
const FEATURE_LIST = [...]

// 5. Component function
export function ComponentName({ className }: Props) {
  // Hooks
  const [state, setState] = useState()

  // Handlers
  const handleClick = () => { ... }

  // Render
  return (
    <div className={cn("base-classes", className)}>
      {/* JSX */}
    </div>
  )
}
```

### Component Types

**Layout Components** (Full-width sections):
- `header.tsx` - Navigation with sticky positioning
- `footer.tsx` - Multi-column footer with links
- `hero.tsx` - Hero section with gradient backgrounds

**Section Components** (Landing page blocks):
- `features.tsx` - Grid layout with cards
- `testimonials.tsx` - Carousel or grid
- `pricing.tsx` - Pricing tier cards
- `cta-section.tsx` - Call-to-action banner

**Functional Components** (Complex features):
- `pricing-estimator.tsx` - Multi-step form with calculations

**UI Components** (`components/ui/`):
- Primitive components from shadcn/ui
- Wraps Radix UI with Tailwind styling
- Supports variants via Class Variance Authority

### Client vs Server Components

```typescript
// ✅ Use "use client" for:
// - useState, useEffect, event handlers
// - Browser APIs
// - Interactive components
"use client"
export function InteractiveComponent() { ... }

// ✅ Server components (default):
// - Static content
// - Data fetching
// - Metadata
export default function StaticPage() { ... }
```

---

## Styling Guidelines

### Tailwind CSS v4 Architecture

**Theme Definition** (app/globals.css):
```css
@theme {
  --color-background: oklch(1 0 0);
  --color-primary: oklch(0.45 0.27 262);
  /* ... more colors */
}

:root { /* light theme */ }
.dark { /* dark theme */ }
```

### Color System

**Use semantic color variables:**
```typescript
className="bg-background text-foreground"
className="bg-primary text-primary-foreground"
className="bg-card text-card-foreground"
className="border-border"
```

**Available Colors:**
- `background`, `foreground`
- `primary`, `primary-foreground`
- `secondary`, `secondary-foreground`
- `muted`, `muted-foreground`
- `accent`, `accent-foreground`
- `card`, `card-foreground`
- `popover`, `popover-foreground`
- `destructive`, `destructive-foreground`
- `border`, `input`, `ring`
- `chart-1` through `chart-5`

### Custom Gradient Utilities

**Background Gradients:**
```typescript
className="bg-gradient-1"          // Linear gradient (blue-purple)
className="bg-gradient-2"          // Linear gradient (pink-orange)
className="bg-gradient-radial-1"   // Radial gradient
className="bg-gradient-mesh"       // Complex mesh gradient
```

**Text Gradients:**
```typescript
className="text-gradient-1"        // Gradient text effect
className="text-gradient-2"
className="text-gradient-3"
```

**Border Gradients:**
```typescript
className="border-gradient-1"      // Gradient border
className="border-gradient-2"
```

### The cn() Utility

```typescript
import { cn } from "@/lib/utils"

// Merge classes safely (handles Tailwind conflicts)
className={cn(
  "base-classes",
  conditionalClass && "extra-class",
  className
)}
```

**Why use cn():**
- Resolves Tailwind class conflicts (`tailwind-merge`)
- Handles conditional classes (`clsx`)
- Type-safe className composition

### Responsive Design

```typescript
// Mobile-first approach
className="text-sm md:text-base lg:text-lg"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="hidden md:block"
```

**Breakpoints:**
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

---

## Form Handling

### React Hook Form + Zod Pattern

**Example from pricing-estimator.tsx:**

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// 1. Define schema
const formSchema = z.object({
  fundType: z.string().min(1, "Fund type is required"),
  aum: z.number().min(1).max(50000),
  investors: z.number().min(1).max(10000),
  // ... more fields
})

// 2. Infer TypeScript type
type FormData = z.infer<typeof formSchema>

// 3. Initialize form
export function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fundType: "",
      aum: 100,
      investors: 50,
    },
  })

  // 4. Watch values for real-time updates
  const fundType = form.watch("fundType")

  // 5. Submit handler
  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

### Form Components

**Input:**
```typescript
<Input
  type="email"
  {...form.register("email")}
  className="..."
/>
```

**Select:**
```typescript
<Select
  value={form.watch("fundType")}
  onValueChange={(value) => form.setValue("fundType", value)}
>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

**Slider:**
```typescript
<Slider
  value={[form.watch("aum")]}
  onValueChange={([value]) => form.setValue("aum", value)}
  min={1}
  max={50000}
  step={1}
  className="..."
/>
```

**Checkbox:**
```typescript
<Checkbox
  checked={selectedItems.includes("item1")}
  onCheckedChange={(checked) => {
    // Update array
  }}
/>
```

---

## Routing & Navigation

### Route Structure

```
/                    → app/page.tsx (Homepage)
/pricing-estimator   → app/pricing-estimator/page.tsx
```

### Adding New Routes

```bash
# Create new route
mkdir -p app/new-route
touch app/new-route/page.tsx
```

```typescript
// app/new-route/page.tsx
export const metadata = {
  title: "New Route - StreamLine",
  description: "Description here",
}

export default function NewRoute() {
  return <div>Content</div>
}
```

### Navigation Links

```typescript
import Link from "next/link"

// Internal route
<Link href="/pricing-estimator">Pricing</Link>

// Anchor link (same page)
<Link href="#features">Features</Link>

// External link
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External
</Link>
```

### Metadata

```typescript
// Static metadata
export const metadata = {
  title: "Page Title - StreamLine",
  description: "Page description",
}

// Dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: `Dynamic ${params.id}`,
  }
}
```

---

## Common Tasks

### Adding a New Section Component

```typescript
// 1. Create component file
// components/new-section.tsx

"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function NewSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Section Title
      </h2>
      {/* Section content */}
    </section>
  )
}

// 2. Import in page
// app/page.tsx
import { NewSection } from "@/components/new-section"

export default function Home() {
  return (
    <>
      {/* ... other sections */}
      <NewSection />
    </>
  )
}
```

### Adding a New UI Component

```bash
# Option 1: Use shadcn CLI (if component exists in shadcn)
npx shadcn-ui@latest add <component-name>

# Option 2: Manual creation
# Create file in components/ui/ following shadcn patterns
```

### Modifying the Pricing Estimator

**Location:** `components/pricing-estimator.tsx`

**Key areas:**

1. **Form Schema** (lines ~30-40): Add/modify fields
2. **Calculation Logic** (function `calculatePricing()`): Update pricing formulas
3. **Multipliers** (constants): Adjust pricing factors
4. **Results Display** (JSX): Modify pricing tier presentation

**Example - Adding a new field:**

```typescript
// 1. Update schema
const formSchema = z.object({
  // ... existing fields
  newField: z.string().min(1, "Required"),
})

// 2. Add default value
defaultValues: {
  // ... existing defaults
  newField: "",
}

// 3. Add to form UI
<Select
  value={form.watch("newField")}
  onValueChange={(value) => form.setValue("newField", value)}
>
  {/* Options */}
</Select>

// 4. Use in calculation
const newFieldMultiplier = data.newField === "option1" ? 1.2 : 1.0
const finalPrice = basePrice * newFieldMultiplier
```

### Adding Dark Mode Toggle

```typescript
// components/theme-toggle.tsx
"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Toggle Theme
    </Button>
  )
}

// Add to header.tsx
import { ThemeToggle } from "@/components/theme-toggle"
```

### Formatting Currency

```typescript
// Use Intl.NumberFormat (as in pricing-estimator.tsx)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// Usage
formatCurrency(50000) // "$50,000"
```

### Adding Icons

```typescript
import { IconName } from "lucide-react"

// Use consistent sizing
<IconName className="h-4 w-4" />        // Small
<IconName className="h-5 w-5" />        // Medium
<IconName className="h-6 w-6" />        // Large
<IconName className="h-8 w-8" />        // Extra large

// With color
<IconName className="h-4 w-4 text-primary" />
```

---

## Important Notes

### Do's

- ✅ Use `cn()` for className composition
- ✅ Use absolute imports (`@/components/...`)
- ✅ Follow kebab-case for file names
- ✅ Add `"use client"` for interactive components
- ✅ Use Zod for form validation
- ✅ Use semantic color variables
- ✅ Write descriptive commit messages
- ✅ Test responsive design (mobile-first)
- ✅ Use TypeScript strict mode
- ✅ Leverage shadcn/ui components
- ✅ Follow existing component patterns

### Don'ts

- ❌ Don't create new components without checking if shadcn/ui has one
- ❌ Don't use hardcoded colors (use theme variables)
- ❌ Don't skip TypeScript types
- ❌ Don't use relative imports across directories
- ❌ Don't modify `components/ui/` files directly (they're generated)
- ❌ Don't push to main branch directly
- ❌ Don't skip form validation
- ❌ Don't forget to handle loading/error states
- ❌ Don't use `any` type
- ❌ Don't create CSS files (use Tailwind)

### Special Files - Do Not Modify Lightly

- `app/globals.css` - Contains theme variables and custom utilities
- `components/ui/*` - Generated by shadcn CLI
- `lib/utils.ts` - Core utility functions
- `components.json` - Shadcn configuration
- `tsconfig.json` - TypeScript configuration
- `next.config.mjs` - Next.js configuration

### Performance Considerations

- Server components by default (faster initial load)
- Use `"use client"` sparingly
- Images should use `next/image` (not currently in project)
- Lazy load heavy components if needed
- Minimize client-side JavaScript

### Accessibility

- All interactive elements should be keyboard accessible
- Use semantic HTML
- Radix UI components are pre-accessible
- Test with screen readers when adding complex interactions
- Maintain color contrast ratios (WCAG AA minimum)

### Analytics

- Vercel Analytics is enabled in root layout
- Automatic page view tracking
- No custom event tracking currently implemented

---

## Troubleshooting

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Type errors
npm run build  # Check for TypeScript errors
```

### Styling Issues

```bash
# Check Tailwind class conflicts
# Use cn() utility to merge classes properly

# Dark mode not working
# Ensure ThemeProvider wraps app in layout.tsx
# Check CSS variables are defined for both :root and .dark
```

### Form Validation Issues

```typescript
// Log form state for debugging
console.log(form.formState.errors)
console.log(form.watch())

// Check Zod schema matches form fields
// Ensure defaultValues match schema types
```

---

## Quick Reference

### Essential Commands

```bash
npm run dev           # Start dev server (http://localhost:3000)
npm run build         # Production build
npm run start         # Production server
npm run lint          # Run ESLint
```

### Essential Imports

```typescript
// UI Components
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Utilities
import { cn } from "@/lib/utils"

// Icons
import { ArrowRight, Check, X } from "lucide-react"

// Next.js
import Link from "next/link"
import { usePathname } from "next/navigation"
```

### File Locations Reference

| What | Where |
|------|-------|
| Homepage | `app/page.tsx` |
| Root layout | `app/layout.tsx` |
| Global styles | `app/globals.css` |
| Theme variables | `app/globals.css` (lines 4-136) |
| Custom gradients | `app/globals.css` (lines 147-201) |
| Pricing calculator | `components/pricing-estimator.tsx` |
| Navigation header | `components/header.tsx` |
| UI primitives | `components/ui/` |
| Utility functions | `lib/utils.ts` |
| TypeScript config | `tsconfig.json` |
| Dependencies | `package.json` |

---

## Summary

This is a **modern, production-ready Next.js SaaS landing page** with:

- **App Router** architecture (Next.js 16)
- **TypeScript** strict mode
- **Tailwind CSS v4** with custom theme
- **Shadcn/UI** component library
- **React Hook Form + Zod** for forms
- **Dark mode** support
- **Sophisticated pricing calculator** (764 lines of business logic)
- **Mobile-first** responsive design
- **Vercel Analytics** integration

**Key Philosophy:**
- Component composition over complexity
- Type safety throughout
- Utility-first styling
- Accessible by default
- Mobile-first responsive

When making changes, follow existing patterns, maintain type safety, and test responsiveness across breakpoints.

---

**For Questions or Updates:**
- Check this file first
- Review existing components for patterns
- Consult Next.js 16 App Router docs
- Reference shadcn/ui documentation
- Test changes in dev mode before committing
