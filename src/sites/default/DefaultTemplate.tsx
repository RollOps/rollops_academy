import type { SiteConfig } from '@/config/sites'
import { EditableSection } from '@/components/editing/EditableSection'

interface DefaultTemplateProps {
  site: SiteConfig
}

export function DefaultTemplate({ site }: DefaultTemplateProps) {
  return (
    <>
      {/* Hero Section */}
      <EditableSection label="hero">
        <section
          className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 text-center"
          style={{
            background: site.heroImageUrl
              ? `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${site.heroImageUrl}) center/cover no-repeat`
              : `radial-gradient(ellipse at 30% 20%, ${site.theme.accent}15 0%, transparent 50%),
                 radial-gradient(ellipse at 70% 80%, ${site.theme.accent}08 0%, transparent 50%),
                 ${site.theme.background}`,
          }}
        >
          <div className="absolute left-0 top-0 h-1 w-full" style={{ background: `linear-gradient(90deg, transparent 0%, ${site.theme.accent} 50%, transparent 100%)` }} />

          <div className="relative z-10 max-w-3xl">
            {site.logo && (
              <img src={site.logo} alt={site.name} className="mx-auto mb-6 h-20 w-20 rounded-full object-cover" />
            )}
            <h1 className="mb-4 text-5xl font-black uppercase tracking-tight md:text-7xl" style={{ color: site.theme.text }}>
              {site.name}
            </h1>
            {site.tagline && (
              <p className="mb-6 text-lg md:text-xl" style={{ color: site.theme.textMuted }}>
                {site.tagline}
              </p>
            )}
            <div className="mx-auto mb-6 h-px w-20" style={{ backgroundColor: site.theme.accent }} />
            {site.location && (
              <p className="mb-8 text-sm font-medium uppercase tracking-widest" style={{ color: site.theme.textMuted }}>
                {site.location}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              {site.contact?.phone && (
                <a
                  href={`tel:${site.contact.phone}`}
                  className="rounded-sm px-8 py-3 text-xs font-bold uppercase tracking-wider transition-all hover:brightness-110"
                  style={{ backgroundColor: site.theme.accent, color: '#000000' }}
                >
                  Call Now
                </a>
              )}
              <a
                href="#contact"
                className="rounded-sm border px-8 py-3 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/5"
                style={{ borderColor: site.theme.textMuted, color: site.theme.text }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </EditableSection>

      {/* About Section */}
      {site.description && (
        <EditableSection label="about">
          <section id="about" className="px-6 py-20" style={{ backgroundColor: site.theme.surface }}>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: site.theme.accent }}>
                About Us
              </p>
              <h2 className="mb-8 text-3xl font-bold md:text-4xl" style={{ color: site.theme.text }}>
                {site.name}
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: site.theme.textMuted }}>
                {site.description}
              </p>
            </div>
          </section>
        </EditableSection>
      )}

      {/* Services Section */}
      {site.services && site.services.length > 0 && (
        <EditableSection label="services">
          <section id="services" className="px-6 py-20" style={{ backgroundColor: site.theme.background }}>
            <div className="mx-auto max-w-5xl">
              <div className="mb-12 text-center">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: site.theme.accent }}>
                  What We Offer
                </p>
                <h2 className="text-3xl font-bold md:text-4xl" style={{ color: site.theme.text }}>
                  Our Services
                </h2>
              </div>
              <div className={`grid gap-6 ${site.services.length === 1 ? 'max-w-md mx-auto' : site.services.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                {site.services.map((service, i) => (
                  <div
                    key={i}
                    className="rounded-xl border-t-2 p-6"
                    style={{ borderTopColor: site.theme.accent, backgroundColor: site.theme.surface }}
                  >
                    <h3 className="mb-3 text-lg font-bold" style={{ color: site.theme.text }}>
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: site.theme.textMuted }}>
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* Hours of Operation */}
      {site.hoursOfOperation && Object.keys(site.hoursOfOperation).length > 0 && (
        <EditableSection label="hours">
          <section id="hours" className="px-6 py-20" style={{ backgroundColor: site.theme.surface }}>
            <div className="mx-auto max-w-lg">
              <div className="mb-12 text-center">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: site.theme.accent }}>
                  Hours
                </p>
                <h2 className="text-3xl font-bold md:text-4xl" style={{ color: site.theme.text }}>
                  When We&apos;re Open
                </h2>
              </div>
              <div className="space-y-3">
                {Object.entries(site.hoursOfOperation).map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex items-center justify-between rounded-lg px-4 py-3"
                    style={{ backgroundColor: site.theme.background }}
                  >
                    <span className="text-sm font-semibold capitalize" style={{ color: site.theme.text }}>
                      {day}
                    </span>
                    <span className="text-sm" style={{ color: site.theme.textMuted }}>
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* Contact Section */}
      <EditableSection label="contact">
        <section id="contact" className="px-6 py-20" style={{ backgroundColor: site.theme.background }}>
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: site.theme.accent }}>
                Get In Touch
              </p>
              <h2 className="text-3xl font-bold md:text-4xl" style={{ color: site.theme.text }}>
                Contact Us
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {site.contact?.phone && (
                <a
                  href={`tel:${site.contact.phone}`}
                  className="group flex flex-col items-center rounded-xl p-6 text-center transition-colors"
                  style={{ backgroundColor: site.theme.surface }}
                >
                  <svg className="mb-3 h-8 w-8" style={{ color: site.theme.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  <span className="text-sm font-semibold" style={{ color: site.theme.text }}>{site.contact.phone}</span>
                </a>
              )}

              {site.contact?.email && (
                <a
                  href={`mailto:${site.contact.email}`}
                  className="group flex flex-col items-center rounded-xl p-6 text-center transition-colors"
                  style={{ backgroundColor: site.theme.surface }}
                >
                  <svg className="mb-3 h-8 w-8" style={{ color: site.theme.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-sm font-semibold" style={{ color: site.theme.text }}>{site.contact.email}</span>
                </a>
              )}

              {site.contact?.address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(site.contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center rounded-xl p-6 text-center transition-colors"
                  style={{ backgroundColor: site.theme.surface }}
                >
                  <svg className="mb-3 h-8 w-8" style={{ color: site.theme.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span className="text-sm font-semibold" style={{ color: site.theme.text }}>{site.contact.address}</span>
                </a>
              )}
            </div>

            {/* Social Links */}
            {(site.social?.facebook || site.social?.instagram || site.social?.youtube) && (
              <div className="mt-8 flex justify-center gap-4">
                {site.social.facebook && (
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-3 transition-colors hover:brightness-110"
                    style={{ backgroundColor: '#1877F2' }}
                  >
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
                {site.social.instagram && (
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-3 transition-colors hover:brightness-110"
                    style={{ backgroundColor: '#E4405F' }}
                  >
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                )}
                {site.social.youtube && (
                  <a
                    href={site.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-3 transition-colors hover:brightness-110"
                    style={{ backgroundColor: '#FF0000' }}
                  >
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </section>
      </EditableSection>
    </>
  )
}
