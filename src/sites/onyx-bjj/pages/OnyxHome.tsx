import type { SiteConfig } from '@/config/sites'

interface OnyxHomeProps {
  site: SiteConfig
}

export function OnyxHome({ site }: OnyxHomeProps) {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex min-h-[85vh] items-center justify-center px-6 text-center"
        style={{
          background: `linear-gradient(135deg, ${site.theme.primary} 0%, ${site.theme.background} 100%)`,
        }}
      >
        <div className="relative z-10 max-w-4xl">
          <h1
            className="mb-6 text-6xl font-black uppercase tracking-widest md:text-8xl"
            style={{ color: site.theme.text }}
          >
            Onyx BJJ
          </h1>
          <p className="mb-4 text-xl font-light md:text-2xl" style={{ color: site.theme.textMuted }}>
            Brazilian Jiu-Jitsu Academy
          </p>
          <p className="mb-10 text-lg" style={{ color: site.theme.textMuted }}>
            Safford, Arizona
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#about"
              className="rounded-lg px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-90"
              style={{ backgroundColor: site.theme.accent, color: '#ffffff' }}
            >
              Learn More
            </a>
            <a
              href="#schedule"
              className="rounded-lg border-2 px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-white/10"
              style={{ borderColor: site.theme.accent, color: site.theme.accent }}
            >
              View Schedule
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-24" style={{ backgroundColor: site.theme.surface }}>
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-8 text-center text-3xl font-bold uppercase tracking-wider"
            style={{ color: site.theme.text }}
          >
            About Our Academy
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-xl font-semibold" style={{ color: site.theme.accent }}>
                World-Class Training
              </h3>
              <p className="leading-relaxed" style={{ color: site.theme.textMuted }}>
                Onyx BJJ provides high-quality Brazilian Jiu-Jitsu instruction for all skill levels.
                Whether you&apos;re a complete beginner or an experienced competitor, our programs are
                designed to help you grow on and off the mats.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-semibold" style={{ color: site.theme.accent }}>
                Programs For Everyone
              </h3>
              <p className="leading-relaxed" style={{ color: site.theme.textMuted }}>
                We offer classes for kids, teens, and adults. Our curriculum covers fundamentals,
                advanced techniques, competition preparation, and self-defense. Join our
                welcoming community and start your journey today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="px-6 py-24" style={{ backgroundColor: site.theme.background }}>
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-8 text-center text-3xl font-bold uppercase tracking-wider"
            style={{ color: site.theme.text }}
          >
            Class Schedule
          </h2>
          <div className="overflow-hidden rounded-xl border border-white/10" style={{ backgroundColor: site.theme.surface }}>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 font-semibold" style={{ color: site.theme.accent }}>Day</th>
                  <th className="px-6 py-4 font-semibold" style={{ color: site.theme.accent }}>Time</th>
                  <th className="px-6 py-4 font-semibold" style={{ color: site.theme.accent }}>Class</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { day: 'Monday', time: '6:00 PM - 7:30 PM', cls: 'All Levels BJJ' },
                  { day: 'Tuesday', time: '6:00 PM - 7:00 PM', cls: 'Kids BJJ' },
                  { day: 'Tuesday', time: '7:00 PM - 8:30 PM', cls: 'Adult BJJ' },
                  { day: 'Wednesday', time: '6:00 PM - 7:30 PM', cls: 'All Levels BJJ' },
                  { day: 'Thursday', time: '6:00 PM - 7:00 PM', cls: 'Kids BJJ' },
                  { day: 'Thursday', time: '7:00 PM - 8:30 PM', cls: 'Adult BJJ' },
                  { day: 'Saturday', time: '10:00 AM - 12:00 PM', cls: 'Open Mat' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="px-6 py-3" style={{ color: site.theme.text }}>{row.day}</td>
                    <td className="px-6 py-3" style={{ color: site.theme.textMuted }}>{row.time}</td>
                    <td className="px-6 py-3" style={{ color: site.theme.textMuted }}>{row.cls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs" style={{ color: site.theme.textMuted }}>
            Schedule subject to change. Contact us for the latest updates.
          </p>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="px-6 py-24" style={{ backgroundColor: site.theme.surface }}>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="mb-4 text-3xl font-bold uppercase tracking-wider"
            style={{ color: site.theme.text }}
          >
            Ready to Train?
          </h2>
          <p className="mb-8" style={{ color: site.theme.textMuted }}>
            Join the Onyx BJJ family. Your first class is free — come see what we&apos;re all about.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {site.social?.facebook && (
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: site.theme.accent, color: '#ffffff' }}
              >
                Contact Us on Facebook
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
