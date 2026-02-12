# RollOps Academy

Managed websites for martial arts academies, hosted under the `rollops.academy` domain with subdomain routing.

Each gym gets their own subdomain (e.g., `onyx.rollops.academy`) with a custom-themed site and optional RollOps Authentication integration.

## Tech Stack

- **React 19** + **TypeScript** — UI framework
- **Vite 7** — Build tool and dev server
- **Tailwind CSS v4** — Utility-first styling
- **React Router v7** — Client-side routing

## Architecture

```
src/
├── config/
│   └── sites.ts          # Site registry — add new gyms here
├── lib/
│   └── subdomain.ts      # Subdomain detection logic
├── hooks/
│   └── useSiteConfig.ts  # React hook for current site config
├── components/
│   ├── layout/           # Shared layout (Navbar, Footer, SiteLayout)
│   ├── auth/             # Auth components (LoginForm)
│   └── ui/               # Shared UI components
├── pages/
│   ├── LandingPage.tsx   # Default page (no subdomain)
│   └── LoginPage.tsx     # Auth page wrapper
├── sites/
│   └── onyx-bjj/         # Site-specific components & pages
│       └── pages/
│           └── OnyxHome.tsx
└── App.tsx               # Root router with subdomain detection
```

### Subdomain Routing

The app detects the current subdomain and loads the corresponding site configuration from `src/config/sites.ts`:

| URL | What loads |
|---|---|
| `rollops.academy` | Platform landing page |
| `onyx.rollops.academy` | Onyx BJJ site |
| `localhost:5173?site=onyx` | Onyx BJJ (dev override) |

### Adding a New Gym

1. Add a `SiteConfig` entry in `src/config/sites.ts`
2. Create site-specific pages in `src/sites/<gym-name>/pages/`
3. Add a case to the `SiteHomePage` switch in `src/App.tsx`

## Getting Started

```bash
npm install
npm run dev
```

### Local Subdomain Testing

Option A — use the `?site=` query param:
```
http://localhost:5173?site=onyx
```

Option B — add an entry to `/etc/hosts`:
```
127.0.0.1 onyx.localhost
```
Then visit `http://onyx.localhost:5173`

## Auth Integration (TODO)

The login UI is stubbed out. Full integration with RollOps Authentication (Supabase Auth) is pending a decision on:

- **Cookie domain**: Auth cookies need to be accessible across subdomains. May require hosting under `rollops.pro` instead of `rollops.academy` for seamless SSO.
- **Supabase project**: Whether to use the existing RollOps Supabase project or a separate one for academy sites.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Hosted Sites

| Subdomain | Gym | Original Site |
|---|---|---|
| `onyx` | Onyx BJJ (Safford, AZ) | [onyxbjj.com](https://onyxbjj.com) |
