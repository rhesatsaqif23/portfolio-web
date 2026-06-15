# Project Case Studies — Implementation Plan

## 1. Database Schema

### projects — add column

```sql
ALTER TABLE projects ADD COLUMN IF NOT EXISTS long_description text;
```

### case_studies — complete redesign

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
  tech_stacks jsonb DEFAULT '[]'::jsonb,
  challenges jsonb DEFAULT '[]'::jsonb,
  results jsonb DEFAULT '[]'::jsonb,
  future_plans jsonb DEFAULT '[]'::jsonb,
  team jsonb DEFAULT '[]'::jsonb,
  gallery jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT case_studies_pkey PRIMARY KEY (id),
  CONSTRAINT case_studies_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

### Column Details

| Column | Type | Description |
|--------|------|-------------|
| `role` | text | Developer role: front-end developer, back-end developer, full-stack developer, android developer, mobile developer |
| `start_date` | date | Project start date |
| `end_date` | date | Project end date |
| `overview` | text | Main description / context of the project |
| `problems` | jsonb | Array of `{ title, description }` |
| `solutions` | jsonb | Array of `{ title, description }` |
| `features` | jsonb | Array of `{ icon, title, description }` |
| `contributions` | jsonb | Array of strings (my responsibilities) |
| `tech_stacks` | jsonb | Array of `{ category, items: [{ name, icon? }] }` |
| `challenges` | jsonb | Array of `{ title, description }` |
| `results` | jsonb | Array of `{ icon, title, description }` |
| `future_plans` | jsonb | Array of strings |
| `team` | jsonb | Array of `{ name, role, avatar? }` |
| `gallery` | jsonb | Array of `{ url, caption, alt }` |

## 2. TypeScript Types

### `src/types/case-study.ts`

```ts
export type DevRole = "front-end developer" | "back-end developer" | "full-stack developer" | "android developer" | "mobile developer";

export interface CaseStudyGalleryItem {
  url: string;
  caption: string;
  alt: string;
}

export interface CaseStudyTechCategory {
  category: string;
  items: { name: string }[];
}

export interface CaseStudySection {
  icon?: string;
  title: string;
  description: string;
}

export interface CaseStudyTeamMember {
  name: string;
  role: string;
  avatar?: string | null;
}

export interface CaseStudy {
  id: string;
  projectId: string;
  role: DevRole;
  startDate: string | null;
  endDate: string | null;
  overview: string | null;
  problems: CaseStudySection[];
  solutions: CaseStudySection[];
  features: CaseStudySection[];
  contributions: string[];
  techStacks: CaseStudyTechCategory[];
  challenges: CaseStudySection[];
  results: CaseStudySection[];
  futurePlans: string[];
  team: CaseStudyTeamMember[];
  gallery: CaseStudyGalleryItem[];
}
```

### Update `src/types/project.ts` — add `longDescription`

```ts
export interface Project {
  // ... existing fields
  longDescription: string | null;
}
```

## 3. Data Layer (`src/lib/data.ts`)

Add:
- `getCaseStudyByProjectSlug(slug: string): Promise<CaseStudy | null>`
- `getProjectBySlug(slug: string): Promise<Project | null>`

Update:
- `mapProject()` — add `long_description` mapping

## 4. API Route

`GET /api/case-studies?slug=<slug>`

Returns: `{ caseStudy: CaseStudy | null, project: Project | null }`

## 5. Page

`src/app/projects/[slug]/page.tsx` — server component

- Fetches case study + project by slug
- Renders full case study layout with:
  - Hero section (title, role, dates, links)
  - Overview
  - Problems & Solutions
  - Contributions
  - Tech Stack
  - Features
  - Gallery
  - Challenges
  - Results
  - Future Plans
  - Team
  - Back to portfolio link

## 6. Component Updates

- `ProjectCardExpanded.tsx` — show `longDescription` in the modal
- `src/lib/data.ts` `mapProject()` — map `long_description`

## 7. Seed Data

Initial case study for **Swara Ibu** as the first case study content.
