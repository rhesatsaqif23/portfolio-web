# Portfolio Web — Rhesa Tsaqif

A modern, responsive portfolio website built with **Next.js 16**, **TypeScript**, and **Supabase**. Features a dynamic single-page layout with animated sections, a project showcase with case studies, an interactive tech stack grid, and a fully managed backend via Supabase.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 16 (App Router, React Server Components) |
| **Language** | TypeScript ~5.9 |
| **Styling** | Tailwind CSS v4, tw-animate-css, Radix UI, shadcn/ui |
| **Animation** | Framer Motion, react-vertical-timeline-component |
| **Icons** | lucide-react |
| **Backend** | Supabase (PostgreSQL, Storage) |
| **3D** | ogl (WebGL) |
| **Font** | Work Sans via next/font |

## Features

- **Hero Section** — Animated name, typing effect for roles, 3D decorative background, social links, CV download
- **About Section** — Bio with dynamic stats (years of experience, projects shipped, etc.)
- **Tech Stack** — Bento-grid layout of skill categories with icons from Supabase Storage
- **Projects** — Filterable grid (All / Web / Mobile) with expandable modal cards, skeleton loading, and case study pages
- **Case Studies** — In-depth `/projects/[slug]` pages with overview, problems, solutions, contributions, features, tech stack, gallery (lightbox carousel), and results
- **Experience Timeline** — Vertical zig-zag timeline for work, organizations, volunteer, and education
- **Achievements** — Accordion-style list with category icons (hackathon, software development, etc.)
- **Contact Section** — Email button with shine animation, location, and social links
- **Responsive Design** — Mobile-first with adaptive layouts across all breakpoints
- **Dark Theme** — Dark mode with cyan/blue accents, glassmorphism cards, custom scrollbar

## Pages

| Route | Description |
|-------|-------------|
| `/` | Single-page portfolio (Hero, About, Stack, Projects, Experiences, Achievements, Contact) |
| `/projects` | All projects page with filters |
| `/projects/[slug]` | In-depth case study for each project |

## Supabase Schema

The project uses 7 Supabase tables:

- **profiles** — Owner/developer profile (name, bio, social links, CV)
- **skills** — Skills with category, icon URL, and sort order
- **experiences** — Work, education, organizational, and volunteer entries
- **projects** — Project metadata, thumbnails, tech stacks, and links
- **case_studies** — Rich JSON content per project (problems, solutions, features, gallery, etc.)
- **achievements** — Awards, hackathon wins, and certifications with category
- **stats** — Numerical stats displayed in the About section

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project with the schema above

### Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
```

### Install & Run

```bash
npm install
npm run dev       # → http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — Navbar, Footer, ThemeProvider
│   ├── page.tsx            # Homepage — fetches all data, renders sections
│   ├── api/                # Route Handlers (data API with 60s revalidate)
│   └── projects/
│       ├── page.tsx        # All projects
│       └── [slug]/page.tsx # Case study detail
├── components/
│   ├── about/              # About section, profile card
│   ├── achievements/       # Achievement accordion
│   ├── case-study/         # Breadcrumb, gallery carousel, tech stack icons
│   ├── common/             # Footer, ThemeProvider, ClickSpark, ModalPortal, ImageWithFallback
│   ├── contact/            # Contact section
│   ├── experience/         # Timeline, experience cards
│   ├── hero/               # Hero section, buttons, socials
│   ├── navbar/             # Navigation bar with active section tracking
│   ├── projects/           # Project grid, cards (collapsed/expanded), filter bar
│   ├── tech-stack/         # Tech stack bento grid
│   └── ui/                 # shadcn/ui primitives
├── lib/
│   ├── data.ts             # Direct Supabase query functions
│   ├── api.ts              # Client-side fetch wrappers
│   └── supabase/           # Supabase client config
├── types/                  # TypeScript interfaces
└── hooks/                  # Custom hooks (useInView, usePrefersReducedMotion, etc.)
```

## Architecture

```
Server Components → lib/data.ts (direct Supabase) → PostgreSQL
                  → app/api/* (Route Handlers)    → PostgreSQL
Client Components → lib/api.ts (fetch /api/*)     → Route Handlers
```

- Server components fetch data directly via Supabase client
- API routes provide cached endpoints (`revalidate: 60`) for client-side fetching
- All snake_case DB columns are mapped to camelCase TypeScript interfaces
- Case study pages use `force-dynamic` rendering to prevent static generation issues

## Deployment

Optimized for **Vercel** with zero-config deployment:

```bash
npm run build
vercel --prod
```

The `next.config.ts` configures remote image patterns for Supabase Storage and CDNs.

## License

MIT
