import type { SiteConfig } from '@/config/sites'

interface FooterProps {
  site: SiteConfig
}

export function Footer({ site }: FooterProps) {
  return (
    <footer
      className="border-t border-white/10 py-12"
      style={{ backgroundColor: site.theme.primary }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-2 text-lg font-bold" style={{ color: site.theme.text }}>
              {site.name}
            </h3>
            <p className="text-sm" style={{ color: site.theme.textMuted }}>
              {site.tagline}
            </p>
          </div>

          {/* Contact */}
          {site.contact && (
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: site.theme.textMuted }}>
                Contact
              </h4>
              {site.contact.address && (
                <p className="text-sm" style={{ color: site.theme.text }}>{site.contact.address}</p>
              )}
              {site.contact.phone && (
                <p className="text-sm" style={{ color: site.theme.text }}>{site.contact.phone}</p>
              )}
              {site.contact.email && (
                <p className="text-sm" style={{ color: site.theme.text }}>{site.contact.email}</p>
              )}
            </div>
          )}

          {/* Social */}
          {site.social && (
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider" style={{ color: site.theme.textMuted }}>
                Follow Us
              </h4>
              <div className="flex gap-4">
                {site.social.facebook && (
                  <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: site.theme.accent }}>
                    Facebook
                  </a>
                )}
                {site.social.instagram && (
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: site.theme.accent }}>
                    Instagram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <p className="text-xs" style={{ color: site.theme.textMuted }}>
            Powered by <a href="https://rollops.pro" className="hover:underline" style={{ color: site.theme.accent }}>RollOps</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
