# Portfolio Migration Plan

## Goal

Replace all hardcoded data with database values from Supabase using the new schema. Create API routes as intermediaries (no direct Supabase calls in pages/components). Convert projects grid from 3 columns to 2. Show 4 dynamic stats in About section.

---

## New Supabase Schema (Verified)

| Table | Key Columns | Already Exists |
|-------|-------------|:---:|
| `profiles` | `full_name`, `current_role`, `current_roles[]`, `bio_short`, `bio_long`, `avatar_url`, `cv_url`, `location`, `email`, `github`, `linkedin`, `instagram` | ✅ |
| `skills` | `name`, `category`, `icon_url`, `sort_order` | ✅ |
| `experiences` | `org_name`, `role`, `start_date`, `end_date`, `description[]`, `type`, `image_url`, `sort_order` | ✅ |
| `projects` | `title`, `slug`, `description_short`, `thumbnail_url`, `tech_stacks[]`, `is_featured`, `category`, `github_url`, `live_url`, `additional_links(jsonb)`, `sort_order` | ✅ |
| `achievements` | `title`, `event_name`, `organizer`, `date`, `description`, `url`, `sort_order` | ✅ |
| `stats` | `key`, `value`, `category`, `sub_value`, `icon`, `sort_order` | ✅ |
| `case_studies` | `project_id`, `content_markdown`, `gallery_jsonb` | ✅ (empty) |

---

## Database Column Mapping (Old → New)

### experiences
| old column | new column | old interface field | new interface field |
|---|---|---|---|
| `title` | `role` | `title` | `role` |
| `company` | `org_name` | `company` | `orgName` |
| `image` | `image_url` | `image` | `imageUrl` |
| — | `type` | — | `type` (work/org/volunteer/edu) |
| — | `sort_order` | — | `sortOrder` |
| `location` | *(dropped)* | `location` | *(dropped)* |

### projects
| old column | new column | old interface field | new interface field |
|---|---|---|---|
| `subtitle` | *(dropped)* | `subtitle` | *(dropped)* |
| `description` | `description_short` | `description` | `descriptionShort` |
| `demo_url` | `live_url` | `demoUrl` | `liveUrl` |
| `repo_url` | `github_url` | `repoUrl` | `githubUrl` |
| `tech_stack` | `tech_stacks` | `techStack` | `techStacks` |
| — | `sort_order` | — | `sortOrder` |
| — | `additional_links` | — | `additionalLinks` |

### achievements
| old column | new column | old interface field | new interface field |
|---|---|---|---|
| `position` | *(dropped)* | `position` | *(dropped)* |
| `issuer` | `organizer` | `issuer` | `organizer` |
| `credential_url` | `url` | `credentialUrl` | `url` |
| `category` | *(dropped)* | `category` | *(dropped)* |
| `image_url` | *(dropped)* | `imageUrl` | *(dropped)* |
| — | `event_name` | — | `eventName` |
| — | `sort_order` | — | `sortOrder` |

---

## Step-by-Step Implementation

### Step 1: Clean up & prepare

1. **Remove dead/unused files:**
   - `src/lib/supabase/queries/experiences.ts` (older version)
   - `src/lib/utils.js` + `src/lib/utils.d.ts` (not used, `cn()` exists elsewhere)
   - `src/utils/utils.ts` (duplicate of `lib/utils.ts`)

2. **Remove duplicate `cn()`:** Keep only `lib/utils.ts` (or `src/utils/utils.ts`), update imports to use one location.

3. **Update `.env.local`:** Already has the correct keys — no changes needed.

4. **Update `next.config.ts`:** Add `skillicons.dev` to `remotePatterns` for skill icons.

### Step 2: Create new types (matching new DB schema)

**Files to create/modify:**
- `src/types/profile.ts` — `Profile` interface
- `src/types/skill.ts` — `Skill` interface + `SkillCategory` type
- `src/types/stat.ts` — `Stat` interface
- `src/types/experience.ts` — Update to match new schema
- `src/types/project.ts` — Update to match new schema
- `src/types/achievement.ts` — Update to match new schema

### Step 3: Create Supabase client lib

- `src/lib/supabase/client.ts` — Already exists, uses `createClient` with anon key. Keep as-is.
- `src/lib/supabase/server.ts` — Already exists, uses cookies. Keep as-is (though maybe simplify since API routes will use it instead).

### Step 4: Create API routes (Next.js Route Handlers)

Create route handlers under `src/app/api/`:

1. **`src/app/api/profile/route.ts`** → GET → returns profile data from `profiles` table
2. **`src/app/api/skills/route.ts`** → GET → returns all skills ordered by `sort_order`
3. **`src/app/api/experiences/route.ts`** → GET → returns all experiences ordered by `sort_order`
4. **`src/app/api/projects/route.ts`** → GET → returns all projects ordered by `sort_order`
5. **`src/app/api/achievements/route.ts`** → GET → returns all achievements ordered by `sort_order`
6. **`src/app/api/stats/route.ts`** → GET → returns all stats ordered by `sort_order`

Each route handler:
- Creates a Supabase client (server-side)
- Queries the respective table
- Maps snake_case DB columns to camelCase response
- Returns `Response.json(data)`
- Includes `revalidate = 60` or similar caching

### Step 5: Create data fetching service layer

Create `src/lib/api.ts` — a thin fetch wrapper:

```ts
export async function fetchProfile(): Promise<Profile | null>
export async function fetchSkills(): Promise<Skill[]>
export async function fetchExperiences(): Promise<Experience[]>
export async function fetchProjects(): Promise<Project[]>
export async function fetchAchievements(): Promise<Achievement[]>
export async function fetchStats(): Promise<Stat[]>
```

Each function calls `fetch('/api/<resource>')` and returns typed data.

### Step 6: Update `page.tsx` — Server Component

Replace direct Supabase imports with API calls through the service layer:

```ts
const [profile, skills, experiences, projects, achievements, stats] = await Promise.all([
  fetchProfile(),
  fetchSkills(),
  fetchExperiences(),
  fetchProjects(),
  fetchAchievements(),
  fetchStats(),
]);
```

Pass all data as props to child components.

### Step 7: Update Hero section (`#home`)

**Changes:**
- Accept `profile` prop
- Replace hardcoded name `"Rhesa Tsaqif Adyatma"` with `profile.fullName`
- Replace hardcoded typing roles with `profile.currentRoles` array
- Replace hardcoded social links with `profile.email`, `profile.github`, `profile.linkedin`, `profile.instagram`
- Replace CV download link `/cv.pdf` with `profile.cvUrl` (or fallback to `/cv.pdf`)
- Remove `HeroSocials.tsx` hardcoded data, pass profile data instead

### Step 8: Update TechStackBeam & TechOrbit

- Accept `skills` prop (filter by relevant category)
- Replace hardcoded `techStack` imports with dynamic skills data
- Use `icon_url` from skills (already points to skillicons.dev)
- TechOrbit/TechStackBeam: pick 6 skills for display

### Step 9: Update TechStackSection

- Accept `skills` prop
- Replace `src/data/techStack.ts` import with skills data
- Group by category for display
- Remove `src/data/techStack.ts` (no longer needed)

### Step 10: Update About section (`#about`)

- Accept `profile` and `stats` props
- Replace hardcoded bio text with `profile.bioLong` / `profile.bioShort`
- Replace hardcoded name with `profile.fullName`
- Replace hardcoded 4 info items with 4 stats:
  - Pick 4 stats to display (e.g., `years_experience`, `projects_shipped`, `technologies_explored`, `work_experience`)
  - Each stat card shows: `value` + `subValue` with appropriate icon
- Update ProfileCard to accept avatar URL from profile

### Step 11: Update ExperienceSection

- Update `ExperienceTimelineItem.tsx` to use new field names (`orgName`, `role`, `imageUrl`, etc.)
- Update `ExperienceCard.tsx` to show company logo from `imageUrl`
- Remove `location` display (no longer in schema)
- Add `type` badge (work/education/volunteer/organization)

### Step 12: Update ProjectSection

- Change grid from `lg:grid-cols-3` to `lg:grid-cols-2` (bigger cards)
- Update `ProjectCardCollapsed.tsx`:
  - `project.description` → `project.descriptionShort`
  - `project.demoUrl` → `project.liveUrl`
  - `project.repoUrl` → `project.githubUrl`
  - `project.techStack` → `project.techStacks`
  - `project.subtitle` → remove
- Update `ProjectCardExpanded.tsx`:
  - Same field name changes
  - Remove `subtitle` display
  - Update tech stack badge lookup
- Update `ProjectFilterBar.tsx` categories to match new category values

### Step 13: Update AchievementSection

- Remove `position` and `category` from display (no longer in schema)
- Show `eventName` + `organizer` instead of `issuer`
- Remove `resolvePosition.ts` utility (position field dropped)
- Use a default icon (e.g., `Award` or `Trophy`) for all achievements
- Update `AchievementCard.tsx` to use new achievement interface

### Step 14: Update Contact section (`#contact`)

- Accept `profile` prop
- Replace hardcoded email with `profile.email`
- Replace hardcoded location with `profile.location`
- Replace hardcoded social links with `profile.github`, `profile.linkedin`, `profile.instagram`

### Step 15: Update Footer

- Accept `profile` prop
- Replace hardcoded social links with profile data
- Replace hardcoded name with `profile.fullName`

### Step 16: Remove hardcoded data file

- Delete `src/data/techStack.ts`
- Delete `src/utils/resolvePosition.ts` (no longer needed)
- Delete `src/lib/supabase/queries/` directory

### Step 17: Remove old DB query files

- Delete `src/lib/db/experiences.ts`
- Delete `src/lib/db/projects.ts`
- Delete `src/lib/db/achievements.ts`

### Step 18: Verify & test

- `npm run build` — ensure no TypeScript errors
- Verify all sections render with live data
- Check loading/empty/error states

---

## Files to Create

```
src/app/api/profile/route.ts
src/app/api/skills/route.ts
src/app/api/experiences/route.ts
src/app/api/projects/route.ts
src/app/api/achievements/route.ts
src/app/api/stats/route.ts
src/types/profile.ts
src/types/skill.ts
src/types/stat.ts
src/lib/api.ts
```

## Files to Modify

```
src/types/experience.ts       — update to new schema
src/types/project.ts          — update to new schema
src/types/achievement.ts       — update to new schema
src/app/page.tsx              — use API service layer
src/app/layout.tsx            — optional metadata update
src/components/hero/Hero.tsx  — accept profile prop
src/components/hero/HeroSocials.tsx — accept profile prop
src/components/hero/HeroActions.tsx — accept cvUrl prop
src/components/hero/TechStackBeam.tsx — accept skills prop
src/components/hero/TechOrbit.tsx     — accept skills prop
src/components/about/AboutSection.tsx — accept profile + stats
src/components/about/ProfileCard.tsx  — accept avatarUrl
src/components/about/InfoItem.tsx — accept stat value
src/components/tech-stack/TechStackSection.tsx — accept skills prop
src/components/tech-stack/TechCard.tsx — update icon handling
src/components/experience/ExperienceSection.tsx — update types
src/components/experience/ExperienceTimelineItem.tsx — update types
src/components/experience/ExperienceCard.tsx — update types + add type badge
src/components/projects/ProjectSection.tsx — 2 columns + new types
src/components/projects/ProjectCardCollapsed.tsx — new types
src/components/projects/ProjectCardExpanded.tsx — new types
src/components/achievements/AchievementSection.tsx — new types
src/components/achievements/AchievementCard.tsx — new types (no position/icon)
src/components/contact/ContactSection.tsx — accept profile
src/components/common/Footer.tsx — accept profile
src/utils/supabaseImage.ts — cleanup unused param
next.config.ts — add skillicons.dev
```

## Files to Delete

```
src/data/techStack.ts
src/utils/resolvePosition.ts
src/lib/db/experiences.ts
src/lib/db/projects.ts
src/lib/db/achievements.ts
src/lib/supabase/queries/
```

---

## Data Flow (After Migration)

```
Browser Request
      │
      ▼
src/app/page.tsx  (Server Component)
      │
      │  Promise.all([
      │    fetch('/api/profile'),
      │    fetch('/api/skills'),
      │    fetch('/api/experiences'),
      │    fetch('/api/projects'),
      │    fetch('/api/achievements'),
      │    fetch('/api/stats'),
      │  ])
      │
      ▼
src/app/api/*/route.ts  (Route Handlers — Server-side)
      │
      │  supabase.from('profiles').select('*')...
      │
      ▼
  Supabase Database
      │
      ▼
  JSON response (camelCase)
      │
      ▼
  Page passes typed data as props to Client Components
```

---

## Project Grid Change

**Before:** `lg:grid-cols-3` (3 columns on large screens)

**After:** `lg:grid-cols-2` (2 columns on large screens)

This makes cards wider/bigger for better visual presentation.

---

## About Section Stats

Replace the current 4 hardcoded InfoItems with 4 stats from the `stats` table. Choose these stat keys:

1. `years_experience` → "Years Experience" icon: `Briefcase`
2. `projects_shipped` → "Projects Shipped" icon: `Rocket`
3. `technologies_explored` → "Technologies Explored" icon: `Code2`
4. `github_total_contributions` → "Contributions" icon: `GitBranch`

Each card shows `value` (large number) and `subValue` (label/context).

If a stat key is not found, show a sensible fallback or skip.
