import { Link } from 'react-router-dom'

import { siteRegistry } from '@/config/sites'

/**
 * Default landing page shown when no subdomain is detected.
 * Lists all hosted gym sites.
 */
export function LandingPage() {
  const sites = Object.values(siteRegistry)

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-7xl">
          RollOps <span className="text-indigo-400">Academy</span>
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-slate-400">
          Managed websites for martial arts academies. Beautiful, fast, and integrated
          with the RollOps platform for seamless member management.
        </p>

        {/* Site cards */}
        <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <div
              key={site.subdomain}
              className="group rounded-2xl border border-white/10 p-6 text-left transition-all hover:border-white/20 hover:shadow-xl"
              style={{ backgroundColor: site.theme.surface }}
            >
              <h3 className="mb-1 text-xl font-bold" style={{ color: site.theme.text }}>
                {site.name}
              </h3>
              <p className="mb-4 text-sm" style={{ color: site.theme.textMuted }}>
                {site.tagline}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: site.theme.accent }}
                />
                <span className="text-xs text-slate-500">
                  {site.subdomain}.rollops.academy
                </span>
              </div>
              <Link
                to={`/?site=${site.subdomain}`}
                className="mt-4 inline-block text-sm font-medium hover:underline"
                style={{ color: site.theme.accent }}
              >
                Preview Site
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center">
        <p className="text-xs text-slate-500">
          Powered by <a href="https://rollops.pro" className="text-indigo-400 hover:underline">RollOps</a>
        </p>
      </footer>
    </div>
  )
}
