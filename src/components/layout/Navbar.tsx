import { Link } from 'react-router-dom'

import type { SiteConfig } from '@/config/sites'
import { LogoPlaceholder } from '@/components/ui/LogoPlaceholder'

interface NavbarProps {
  site: SiteConfig
}

export function Navbar({ site }: NavbarProps) {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md"
      style={{ backgroundColor: `${site.theme.primary}ee` }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          {site.logo ? (
            <img src={site.logo} alt={site.name} className="h-8 w-8 rounded-full object-cover" />
          ) : (
            <LogoPlaceholder name={site.name} color={site.theme.accent} size={32} />
          )}
          <span className="text-xl font-bold tracking-wider" style={{ color: site.theme.text }}>
            {site.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink href="/#programs" label="Programs" color={site.theme.textMuted} />
          <NavLink href="/#schedule" label="Schedule" color={site.theme.textMuted} />
          <NavLink href="/#about" label="About" color={site.theme.textMuted} />
          <NavLink href="/#contact" label="Contact" color={site.theme.textMuted} />
          {site.authEnabled && (
            <Link
              to="/login"
              className="rounded-lg px-5 py-2 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: site.theme.accent,
                color: '#ffffff',
              }}
            >
              Member Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, label, color }: { href: string; label: string; color: string }) {
  return (
    <a
      href={href}
      className="text-sm font-medium transition-colors hover:text-white"
      style={{ color }}
    >
      {label}
    </a>
  )
}
