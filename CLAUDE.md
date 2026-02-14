# RollOps Academy — Project Scope

## What This Is

**RollOps Academy** is the web hosting and gym directory platform for Brazilian Jiu-Jitsu academies. It is one half of the RollOps ecosystem.

| Domain | Repo | Purpose |
|--------|------|---------|
| `rollops.pro` | `repos/rollops/` | Core platform — gym management, student accounts, billing, scheduling, check-ins |
| `rollops.academy` | `repos/rollops_academy/` (this repo) | Web hosting for gyms + public gym directory/map |

## Shared Database

Both apps share the **same Supabase project**. The `companies` table is the source of truth for all gyms. A company's UUID (`companies.id`) is used across both platforms:

- In Academy: `GymEntry.id` (from the `gym-directory` edge function)
- In RollOps Pro: `company_id` (used in routing, auth, student enrollment)

**Student signup for ANY gym** always goes through rollops.pro:
```
https://rollops.pro/signup/{COMPANY_UUID}
```
This works for all gyms — they do NOT need a paid hosted website for students to sign up.

Other rollops.pro signup routes:
- `/signup/{companyId}/{locationId}` — location-specific QR code signup
- `/join?code={6_DIGIT_CODE}` — invite code flow
- `/guided-student-onboarding?companyId={UUID}` — direct onboarding wizard

## Tech Stack

- **React 19** + TypeScript + Vite 7
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Supabase** — auth, database, edge functions, storage
- **React Query** — data fetching
- **Google Maps** — `@vis.gl/react-google-maps` for gym directory
- **Cloudflare Workers** — deployment (`wrangler`)

## Key Environment Variables

```
VITE_SUPABASE_URL          — Shared Supabase project URL
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY — Supabase anon key
VITE_GOOGLE_MAPS_API_KEY       — Google Maps API key
VITE_GOOGLE_MAP_ID         — Custom map styling (optional)
```

## Architecture

### Auth & Roles

Auth uses Supabase with JWT claims. Roles are determined by:

| Role | How determined | What they see |
|------|---------------|---------------|
| `platform_admin` | `is_admin` or `is_developer` in JWT (from `admins` table) | Admin dashboard, customer management, DNS setup |
| `hosting_customer` | Has entry in `customer_profiles` table | Customer dashboard, site editor, media uploads |
| `owner` | `user_role === 'owner'` in JWT but no hosted site | Sales/get-started page |
| `authenticated` | Any other valid login | Generic welcome |

### Hosted Sites

Gyms can pay for a custom-hosted website on Academy. Each hosted site is configured in `src/config/sites.ts` with:
- Subdomain (e.g., `onyxbjj` → `onyxbjj.rollops.academy`)
- Theme colors, logo, contact info
- Optional custom React component (`customComponent` key)

The `siteRegistry` in `sites.ts` maps subdomains to `SiteConfig` objects.

### Gym Directory

The public gym directory (`/directory` page) displays all gyms on a Google Maps view:

- **Data source**: `gym-directory` Supabase edge function → returns `GymEntry[]`
- **Filtering**: All client-side (search by name/city/state)
- **GymEntry.id** = `companies.id` UUID from the shared database
- **`is_hosted`**: Whether the gym has a paid hosted website on Academy
- **Sign Up button**: Always links to `https://rollops.pro/signup/{gym.id}`

Key files:
- `src/pages/DirectoryPage.tsx` — page wrapper
- `src/components/directory/GymDirectorySection.tsx` — map + panel orchestrator
- `src/components/directory/GymMap.tsx` — Google Maps with markers
- `src/components/directory/GymDetailPanel.tsx` — two-column gym detail overlay
- `src/components/directory/GymSearchBar.tsx` — search + state filter
- `src/components/directory/GymMarker.tsx` — custom map pin
- `src/lib/gymDirectory.ts` — data types + fetch function
- `src/hooks/useGymDirectory.ts` — React Query hook

### Page Structure

```
/                    → LandingPage (public)
/directory           → DirectoryPage (public gym map)
/login               → LoginPage
/get-started         → GetStartedPage (sales for owners)
/dashboard           → CustomerDashboard (hosting customers)
/dashboard/hours     → HoursPage (edit operating hours)
/dashboard/media     → MediaPage (upload images)
/admin               → AdminDashboard (platform admins)
/admin/customers     → CustomersPage (manage hosted sites)
/admin/dns           → DnsSetupPage (DNS configuration)
```

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # TypeScript check + Vite build
npm run lint     # ESLint
npm run deploy   # Build + deploy to Cloudflare Workers
npm run cf:dev   # Local Cloudflare Workers dev
```

## Important Patterns

- **Glass morphism UI**: Dark backgrounds with `backdrop-blur-xl`, `bg-black/50`, `border-white/10`
- **Brand colors**: Red `#9B1421` (RollOps primary), Green `#37ca37` (success/hosted badge)
- **Supabase edge functions**: Invoked via `supabase.functions.invoke()` with query params in `x-query-params` header
- **No class schedule data yet**: Upcoming classes in the gym detail panel use placeholder data (see `getUpcomingClasses()` in GymDetailPanel.tsx) — ready to swap for real data when an edge function/table is available
