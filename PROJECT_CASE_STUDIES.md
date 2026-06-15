# Project Case Studies — `/projects/[slug]`

Comprehensive documentation of the case study page: database schema, UI/UX design, layout, components, data flow, and content strategy.

---

## 1. Database Schema

### 1.1 `projects` table

```sql
ALTER TABLE projects ADD COLUMN IF NOT EXISTS long_description text;
```

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid PK | Primary key |
| `title` | text | Project display name |
| `slug` | text | URL-safe identifier (used in route params) |
| `description_short` | text | Short tagline shown in cards and hero |
| `long_description` | text | Extended description shown in modal |
| `thumbnail_url` | text | Main image stored in Supabase storage |
| `tech_stacks` | jsonb | Array of skill names (e.g. `["React", "Next.js"]`) |
| `is_featured` | boolean | Whether project appears in featured section |
| `category` | text | Project category (e.g. "Web App", "Mobile") |
| `github_url` | text | Repository link |
| `live_url` | text | Deployed/demo link |
| `additional_links` | jsonb | Array of `{ label, url }` |
| `sort_order` | integer | Determines ordering in project list |

### 1.2 `case_studies` table

```sql
DROP TABLE IF EXISTS public.case_studies;

CREATE TABLE public.case_studies (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL,
  role text NOT NULL DEFAULT 'full-stack developer',
  start_date date,
  end_date date,
  overview text,
  problems jsonb DEFAULT '[]'::jsonb,
  solutions jsonb DEFAULT '[]'::jsonb,
  features jsonb DEFAULT '[]'::jsonb,
  contributions jsonb DEFAULT '[]'::jsonb,
  results jsonb DEFAULT '[]'::jsonb,
  gallery jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT case_studies_pkey PRIMARY KEY (id),
  CONSTRAINT case_studies_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

| Column | Type | Description | JSON shape |
|--------|------|-------------|------------|
| `role` | text | Dev role: `front-end developer`, `back-end developer`, `full-stack developer`, `android developer`, `mobile developer` | — |
| `start_date` | date | Project start | — |
| `end_date` | date | Project end | — |
| `overview` | text | Long-form narrative describing the project context | — |
| `problems` | jsonb | Challenges faced | `[{ title, description }]` |
| `solutions` | jsonb | How each problem was solved | `[{ title, description }]` |
| `features` | jsonb | Key product features | `[{ icon, title, description }]` |
| `contributions` | jsonb | My specific responsibilities | `[string, ...]` |
| `results` | jsonb | Outcomes and achievements | `[{ icon, title, description }]` |
| `gallery` | jsonb | Screenshots and media | `[{ url, caption, alt }]` |

---

## 2. Page Layout & Structure

### 2.1 Overall Layout

```
┌─────────────────────────────────────────────────┐
│  Home › Projects › Project Title   ← Breadcrumb │
├─────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐│
│  │          Main Thumbnail (16:9)              ││
│  └─────────────────────────────────────────────┘│
│                                                   │
│  Project Title (h1)                               │
│  Short description                                │
│  👤 role  📅 Jan 2025 – Mar 2025                  │
│  [🌐 Visit Website] [🐙 View on GitHub]           │
├─────────────────────────────────────────────────┤
│                                                   │
│  01 📄 Overview                                   │
│  ───────────────────────────────────────────────  │
│  Long-form narrative text...                      │
│                                                   │
│  02 ⚠️ Problems & Solutions                       │
│  ┌──────────────┐  ┌──────────────┐               │
│  │ Problems     │  │ Solutions    │               │
│  │ • Slow loads │  │ • Code split │               │
│  └──────────────┘  └──────────────┘               │
│                                                   │
│  03 ⭐ Contributions                               │
│  • Architected the component system                │
│  • Set up CI/CD pipeline                           │
│                                                   │
│  04 ✨ Features                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ 🔒 Auth  │ │ 📊 Dash │ │ 🔔 Notif │           │
│  └──────────┘ └──────────┘ └──────────┘           │
│                                                   │
│  05 💻 Tech Stack                                 │
│  [React icon] React  [TS icon] TypeScript         │
│  [Next icon] Next.js  [TW icon] Tailwind          │
│                                                   │
│  06 🖼️ Gallery                                    │
│  ┌──────┐ ┌──────┐ ┌──────┐                       │
│  │ img1 │ │ img2 │ │ img3 │  ← click → lightbox  │
│  └──────┘ └──────┘ └──────┘                       │
│                                                   │
│  07 📊 Results                                    │
│  ┌──────────┐ ┌──────────┐                        │
│  │ 🚀 2x   │ │ 📈 95%   │                        │
│  └──────────┘ └──────────┘                        │
│                                                   │
├─────────────────────────────────────────────────┤
│  ← Previous Project        Next Project →        │
│                                                   │
│              ← Back to Portfolio                  │
└─────────────────────────────────────────────────┘
```

### 2.2 Page-level Configuration

- **Dynamic rendering**: `export const dynamic = "force-dynamic"` — prevents build-time static generation failure when the DB table doesn't exist yet
- **Metadata**: `generateMetadata` fetches project by slug and returns `<title>` and `<meta description>`

---

## 3. Components

### 3.1 `BreadcrumbNav` (`src/components/case-study/BreadcrumbNav.tsx`)

| Aspect | Detail |
|--------|--------|
| **Purpose** | Shows `Home › Projects › Project Title` breadcrumb trail at the top of the page |
| **Props** | `projectTitle: string` |
| **Icons** | `Home`, `ChevronRight` (from lucide-react) |
| **Styling** | Inline flex with `text-white/50` links that turn `text-cyan-300` on hover; truncates last item on mobile |
| **Responsive** | "Home" label hidden on mobile (`hidden sm:inline`) |
| **Accessibility** | `aria-label="Breadcrumb"` on nav, `ol > li` list structure |

### 3.2 `TechStackIcons` (`src/components/case-study/TechStackIcons.tsx`)

| Aspect | Detail |
|--------|--------|
| **Purpose** | Displays project tech stack skills with their Supabase-stored icons |
| **Props** | `skills: Array<{ name: string; iconUrl: string \| null }>` |
| **Fallback** | Uses `ImageWithFallback` — if `iconUrl` is null or image fails to load, shows `/images/fallback-icon.png` |
| **Layout** | Flexbox wrap, each skill as a pill with icon + name |
| **Styling** | `rounded-xl border border-white/10 bg-slate-950/60` with hover effect |
| **Icon size** | 24×24px (`h-6 w-6`) |
| **Data source** | Skills are fetched from `skills` table by matching `project.techStacks` (string[]) to `skills.name` |

### 3.3 `GalleryCarousel` (`src/components/case-study/GalleryCarousel.tsx`)

| Aspect | Detail |
|--------|--------|
| **Purpose** | Displays gallery images in a grid; clicking opens a full-screen lightbox carousel |
| **Props** | `items: CaseStudyGalleryItem[]` (`{ url, caption, alt }`) |
| **Thumbnail grid** | 2 cols on mobile, 3 cols on `md+` — each is a 16:9 aspect-ratio button |
| **Lightbox** | Full-screen overlay with `bg-black/85 backdrop-blur-md` |
| **Navigation** | Left/right arrow buttons, keyboard arrows (`ArrowLeft`/`ArrowRight`), `Escape` to close |
| **Dots** | Animated dot indicators at the bottom — active dot is wider (`w-6`) and cyan |
| **Caption** | Pill-style caption at bottom of lightbox |
| **Animation** | `framer-motion` `AnimatePresence` for open/close fade |
| **Accessibility** | `aria-label` on all buttons; focus management with keyboard handler |

### 3.4 Hero Section (inline in page)

| Aspect | Detail |
|--------|--------|
| **Thumbnail** | 16:9 aspect ratio, rounded-xl, with border; uses `ImageWithFallback` from Supabase storage |
| **Title** | `text-3xl md:text-4xl lg:text-5xl font-bold text-white` |
| **Description** | `text-white/80 text-base md:text-lg` — maps from `project.descriptionShort` |
| **Role + Dates** | Inline flex with `User` and `Calendar` icons; date formatted as "Jan 2025 – Mar 2025" |
| **Links** | "Visit Website" (cyan pill) and "View on GitHub" (subtle white pill) |

---

## 4. Section Design System

Every content section follows a consistent pattern:

### 4.1 Section Heading Pattern

```html
<h2 className="inline-flex items-center gap-2 text-xl md:text-2xl font-bold text-white mb-4 [color-class]">
  [icon]
  [number]. [Section Name]
</h2>
```

### 4.2 Section Numbering & Icons

| # | Section | Icon | Color | Data Source |
|---|---------|------|-------|-------------|
| 01 | Overview | `FileText` | cyan-400 | `caseStudy.overview` |
| 02 | Problems & Solutions | `AlertTriangle` | red-400 | `caseStudy.problems[]`, `caseStudy.solutions[]` |
| 03 | Contributions | `Star` | amber-400 | `caseStudy.contributions[]` |
| 04 | Features | `Sparkles` | purple-400 | `caseStudy.features[]` |
| 05 | Tech Stack | `Code` | emerald-400 | `project.techStacks` matched to `skills` table |
| 06 | Gallery | `Sparkles` | pink-400 | `caseStudy.gallery[]` |
| 07 | Results | `BarChart3` | emerald-400 | `caseStudy.results[]` |

### 4.3 Section-specific Layouts

| Section | Layout | Details |
|---------|--------|---------|
| **Overview** | Single column | Full-width paragraph with `leading-relaxed` |
| **Problems & Solutions** | Two-column grid (`md:grid-cols-2`) | Left: red-accented problems with left border; Right: green-accented solutions with `CheckCircle` icon |
| **Contributions** | Single column list | Bullet list with amber dot markers |
| **Features** | Two-column grid (`md:grid-cols-2`) | Cards with emoji icon, title, description |
| **Tech Stack** | Flexbox wrap | Icon pills with image + name; unmatched names produce fallback icon |
| **Gallery** | Grid carousel (2/3 cols) | Clickable thumbnails → lightbox with full navigation |
| **Results** | Two-column grid (`md:grid-cols-2`) | Cards with emoji icon, title, description |

---

## 5. Data Flow

### 5.1 Server Component Data Loading

```
CaseStudyPage({ params: { slug } })
  │
  ├── Promise.all([
  │     getProjectBySlug(slug)          → Project | null
  │     getCaseStudyByProjectSlug(slug) → CaseStudy | null
  │     getProjectNeighbors(slug)       → { prev: Project|null, next: Project|null }
  │     getSkillsByNames(techStacks)    → Skill[]
  │   ])
  │
  ├── if (!project) → notFound()
  │
  └── Render page with all data
```

### 5.2 Key Data Functions (`src/lib/data.ts`)

| Function | Purpose | Supabase Query |
|----------|---------|----------------|
| `getProjectBySlug(slug)` | Fetch single project | `from("projects").select("*").eq("slug", slug).single()` |
| `getCaseStudyByProjectSlug(slug)` | Fetch case study via join | `from("case_studies").select("*, projects!inner(slug)").eq("projects.slug", slug).maybeSingle()` |
| `getProjectNeighbors(slug)` | Find prev/next projects | Fetches all projects sorted by `sort_order`, finds adjacent by index |
| `getSkillsByNames(names)` | Match tech stack names to icons | `from("skills").select("*").in("name", names)` |

### 5.3 Storage URLs

- **Bucket**: `tech-stack` (icons) and project-related images
- **Base URL**: `https://ipkrjpftddtxwzmylxtf.supabase.co/storage/v1/object/public`
- **Helper function**: `storageUrl(path)` — if path starts with `http`, use as-is; otherwise prepend base

---

## 6. Responsive Behavior

| Element | Mobile (<640px) | Tablet (640–1023px) | Desktop (≥1024px) |
|---------|----------------|---------------------|-------------------|
| Title | `text-3xl` | `text-4xl` | `text-5xl` |
| Description | `text-base` | `text-lg` | `text-lg` |
| Section headings | `text-xl` | `text-2xl` | `text-2xl` |
| Problems/Solutions | stacked | 2-column grid | 2-column grid |
| Features grid | 1 column | 2 columns | 2 columns |
| Gallery thumbnails | 2 columns | 3 columns | 3 columns |
| Results grid | 1 column | 2 columns | 2 columns |
| Next/Prev nav | stacked | side-by-side | side-by-side |
| Breadcrumb "Home" | icon only | icon + label | icon + label |
| Page padding | `px-6` | `px-10` (sm), `px-20` (md) | `px-28` |
| Breadcrumb title | `truncate max-w-[200px]` | no truncation | no truncation |

---

## 7. Empty State & Fallbacks

| Scenario | Behavior |
|----------|----------|
| No case study exists | Shows "No case study available for this project yet." with "Back to Portfolio" link |
| No thumbnail | Hero section omits the image entirely |
| No tech stacks matched | Tech Stack section not rendered |
| Some skills have no icon | `ImageWithFallback` shows `/images/fallback-icon.png`; note: "Some tech stacks may not have icons — they will fall back to a placeholder." |
| No prev/next project | Empty `div` placeholder in nav to keep layout balanced |
| Gallery has 1 item | Single thumbnail, lightbox works with same-item navigation (wraps around) |
| Feature icon is empty | Emoji/icon renders as-is; no fallback needed |

---

## 8. Navigation & Linking

### 8.1 Breadcrumb Trail

`/` → `/#projects` → `/projects/[slug]`

- Home link goes to `/`
- Projects link goes to `/#projects` (scrolls to project section)
- Active (last) item is non-linked, truncated on mobile

### 8.2 Project Navigation

- **Previous Project**: `< /projects/[prev-slug]` — shows project title, left-aligned
- **Next Project**: `/projects/[next-slug] >` — shows project title, right-aligned
- Ordering is determined by `projects.sort_order` ascending
- If at first/last project, empty placeholder maintains layout

### 8.3 Back Links

- "Back to Portfolio" at the bottom links to `/#projects`
- Footer has no project-specific back link (uses breadcrumb)

---

## 9. Color Palette

| Element | Color |
|---------|-------|
| Page background | `--background` (oklch(0.05 0.01 240)) |
| Text body | `text-white/80` |
| Section heading icons | Varies by section (cyan, red, amber, purple, emerald, pink) |
| Links (hover) | `text-cyan-300` |
| Cards / pills | `bg-slate-950/60` with `border-white/10` |
| Gallery hover overlay | `bg-gradient-to-t from-black/70 to-transparent` |
| Lightbox background | `bg-black/85 backdrop-blur-md` |
| Prev/Next nav | Same card style as feature cards |

---

## 10. Security & Performance

- **No hardcoded secrets**: Storage URL uses environment-variable-based Supabase URL
- **Image optimization**: `next/image` (or `ImageWithFallback`) for automatic optimization, WebP conversion, lazy loading
- **Font**: Work Sans via `next/font` with `display:swap`
- **Gallery**: Thumbnails loaded lazily; lightbox image uses `priority` for fast display
- **Dynamic rendering**: Prevents stale ISR cache and build-time DB dependency

---

## 11. File Map

| File | Type | Purpose |
|------|------|---------|
| `src/app/projects/[slug]/page.tsx` | Next.js page | Main case study page (server component) |
| `src/app/api/case-studies/route.ts` | API route | JSON endpoint `?slug=x` → `{ caseStudy, project }` |
| `src/components/case-study/BreadcrumbNav.tsx` | Client component | Breadcrumb trail |
| `src/components/case-study/TechStackIcons.tsx` | Client component | Tech stack with icon + fallback |
| `src/components/case-study/GalleryCarousel.tsx` | Client component | Clickable thumbnail grid + lightbox |
| `src/components/common/ImageWithFallback.tsx` | Client component | Image with fallback on error |
| `src/lib/data.ts` | Server lib | All Supabase data-fetching functions |
| `src/types/case-study.ts` | TypeScript types | `CaseStudy`, `CaseStudySection`, `CaseStudyFeature`, etc. |
| `src/types/project.ts` | TypeScript types | `Project` (with `longDescription`, `techStacks`) |
| `src/types/skill.ts` | TypeScript types | `Skill` (with `iconUrl`) |
| `PROJECT_CASE_STUDIES.md` | Documentation | This file |

---

## 12. Implementation Steps

1. Run SQL in Supabase dashboard (see schema above)
2. Seed initial case study data for first project (e.g. Swara Ibu)
3. Verify page renders at `/projects/[slug]` with all sections
4. Test gallery lightbox, breadcrumb, prev/next navigation
5. Run `npm run lint` — must pass cleanly
