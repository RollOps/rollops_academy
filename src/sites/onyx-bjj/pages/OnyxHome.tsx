import type { SiteConfig } from '@/config/sites'
import { EditableSection } from '@/components/editing/EditableSection'

interface OnyxHomeProps {
  site: SiteConfig
}

export function OnyxHome({ site }: OnyxHomeProps) {
  return (
    <>
      {/* Hero Section */}
      <EditableSection label="hero">
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 text-center">
          {/* Dark overlay with subtle pattern */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 20%, rgba(55, 202, 55, 0.08) 0%, transparent 50%),
                           radial-gradient(ellipse at 70% 80%, rgba(24, 139, 246, 0.05) 0%, transparent 50%),
                           ${site.theme.background}`,
            }}
          />
          {/* Diagonal accent line */}
          <div
            className="absolute left-0 top-0 h-1 w-full"
            style={{ background: `linear-gradient(90deg, transparent 0%, ${site.theme.accent} 50%, transparent 100%)` }}
          />

          <div className="relative z-10 max-w-4xl">
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.4em]"
              style={{ color: site.theme.accent }}
            >
              Checkmat Affiliate
            </p>
            <h1 className="mb-2 text-7xl font-black uppercase tracking-tight md:text-9xl" style={{ color: site.theme.text }}>
              ONYX
            </h1>
            <h2 className="mb-6 text-2xl font-light uppercase tracking-[0.3em] md:text-3xl" style={{ color: site.theme.textMuted }}>
              Jiu-Jitsu
            </h2>
            <div className="mx-auto mb-8 h-px w-24" style={{ backgroundColor: site.theme.accent }} />
            <p className="mb-2 text-lg font-medium" style={{ color: site.theme.text }}>
              Safford, Arizona
            </p>
            <p className="mb-10 text-sm" style={{ color: site.theme.textMuted }}>
              408 W Main St &bull; Gila Valley
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#programs"
                className="rounded-sm px-10 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:brightness-110"
                style={{ backgroundColor: site.theme.accent, color: '#000000' }}
              >
                View Programs
              </a>
              <a
                href="#contact"
                className="rounded-sm border px-10 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:bg-white/5"
                style={{ borderColor: site.theme.textMuted, color: site.theme.text }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </EditableSection>

      {/* Intro / Philosophy */}
      <EditableSection label="intro">
        <section className="px-6 py-20" style={{ backgroundColor: site.theme.surface }}>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 h-px w-16" style={{ backgroundColor: site.theme.accent }} />
            <blockquote className="mb-6 text-xl font-light italic leading-relaxed md:text-2xl" style={{ color: site.theme.text }}>
              &ldquo;What makes a place special isn&apos;t just the mats or instruction — it&apos;s the feeling when you walk in. That&apos;s what we&apos;re building here.&rdquo;
            </blockquote>
            <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: site.theme.accent }}>
              Tommy Schnell — Head Instructor
            </p>
          </div>
        </section>
      </EditableSection>

      {/* Programs Section */}
      <EditableSection label="programs">
        <section id="programs" className="px-6 py-20" style={{ backgroundColor: site.theme.background }}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: site.theme.accent }}>
                What We Offer
              </p>
              <h2 className="text-3xl font-black uppercase tracking-wide md:text-4xl" style={{ color: site.theme.text }}>
                Programs
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <ProgramCard
                title="Kids Jiu-Jitsu"
                description="Building confidence, discipline, and anti-bullying skills through age-appropriate training. Classes designed to fit family schedules, not the other way around."
                schedule="Tues & Thurs — 5:30 PM"
                accent={site.theme.accent}
                bg={site.theme.surface}
                text={site.theme.text}
                muted={site.theme.textMuted}
              />
              <ProgramCard
                title="Adults"
                description="From fundamentals to advanced competition training. Whether you're brand new or a seasoned competitor, our curriculum meets you where you are."
                schedule="Mon, Wed, Fri — 6:30 PM"
                accent={site.theme.accent}
                bg={site.theme.surface}
                text={site.theme.text}
                muted={site.theme.textMuted}
              />
              <ProgramCard
                title="Women's Program"
                description="A safe, welcoming space for women to grow in Jiu-Jitsu and feel supported. Community-focused training designed to build confidence and technique."
                schedule="Saturday — 10:00 AM"
                accent={site.theme.accent}
                bg={site.theme.surface}
                text={site.theme.text}
                muted={site.theme.textMuted}
              />
            </div>
          </div>
        </section>
      </EditableSection>

      {/* Schedule Section */}
      <EditableSection label="schedule">
        <section id="schedule" className="px-6 py-20" style={{ backgroundColor: site.theme.surface }}>
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: site.theme.accent }}>
                Train With Us
              </p>
              <h2 className="text-3xl font-black uppercase tracking-wide md:text-4xl" style={{ color: site.theme.text }}>
                Weekly Schedule
              </h2>
            </div>

            <div className="overflow-hidden rounded-sm border" style={{ borderColor: site.theme.border, backgroundColor: site.theme.background }}>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr style={{ borderBottom: `2px solid ${site.theme.accent}` }}>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider" style={{ color: site.theme.accent }}>Day</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider" style={{ color: site.theme.accent }}>Time</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider" style={{ color: site.theme.accent }}>Class</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { day: 'Monday', time: '6:30 PM – 8:00 PM', cls: 'All Levels BJJ' },
                    { day: 'Tuesday', time: '5:30 PM – 6:30 PM', cls: 'Kids Jiu-Jitsu' },
                    { day: 'Tuesday', time: '6:30 PM – 8:00 PM', cls: 'Adult BJJ' },
                    { day: 'Wednesday', time: '6:30 PM – 8:00 PM', cls: 'All Levels BJJ' },
                    { day: 'Thursday', time: '5:30 PM – 6:30 PM', cls: 'Kids Jiu-Jitsu' },
                    { day: 'Thursday', time: '6:30 PM – 8:00 PM', cls: 'Adult BJJ' },
                    { day: 'Friday', time: '6:30 PM – 8:00 PM', cls: 'Open Mat / Drilling' },
                    { day: 'Saturday', time: '10:00 AM – 11:30 AM', cls: "Women's Class" },
                    { day: 'Saturday', time: '11:30 AM – 1:00 PM', cls: 'Open Mat' },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="transition-colors hover:bg-white/[0.03]"
                      style={{ borderBottom: `1px solid ${site.theme.border}` }}
                    >
                      <td className="px-6 py-3 font-medium" style={{ color: site.theme.text }}>{row.day}</td>
                      <td className="px-6 py-3" style={{ color: site.theme.textMuted }}>{row.time}</td>
                      <td className="px-6 py-3" style={{ color: site.theme.textMuted }}>{row.cls}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-center text-xs" style={{ color: site.theme.textMuted }}>
              Schedule subject to change. Follow us on Instagram{' '}
              <a
                href="https://www.instagram.com/onyxbjj_/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: site.theme.accent }}
              >
                @onyxbjj_
              </a>{' '}
              for updates.
            </p>
          </div>
        </section>
      </EditableSection>

      {/* About / Affiliation */}
      <EditableSection label="about">
        <section id="about" className="px-6 py-20" style={{ backgroundColor: site.theme.background }}>
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: site.theme.accent }}>
                  Our Story
                </p>
                <h2 className="mb-6 text-3xl font-black uppercase tracking-wide" style={{ color: site.theme.text }}>
                  Built for the Community
                </h2>
                <p className="mb-4 leading-relaxed" style={{ color: site.theme.textMuted }}>
                  Onyx Jiu-Jitsu opened its doors on January 3, 2026, at 408 W Main Street in Safford, Arizona.
                  Led by head instructor Tommy Schnell, we&apos;re proud to bring world-class Jiu-Jitsu to the Gila Valley
                  as an official Checkmat affiliate.
                </p>
                <p className="mb-4 leading-relaxed" style={{ color: site.theme.textMuted }}>
                  We partner with{' '}
                  <span style={{ color: site.theme.text }}>Exodus Jiu-Jitsu</span>{' '}
                  in Phoenix to ensure our students have access to the highest level of instruction, seminars, and competition preparation.
                </p>
                <p className="leading-relaxed" style={{ color: site.theme.textMuted }}>
                  Whether you&apos;re a parent looking for a positive activity for your kids, an adult looking for a new challenge,
                  or a woman looking for a supportive training environment — there&apos;s a place for you here.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-sm border p-6" style={{ borderColor: site.theme.border, backgroundColor: site.theme.surface }}>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: site.theme.accent }}>Affiliation</p>
                  <p className="text-lg font-bold" style={{ color: site.theme.text }}>Checkmat</p>
                  <p className="text-sm" style={{ color: site.theme.textMuted }}>World-class BJJ lineage</p>
                </div>
                <div className="rounded-sm border p-6" style={{ borderColor: site.theme.border, backgroundColor: site.theme.surface }}>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: site.theme.accent }}>Partner Academy</p>
                  <p className="text-lg font-bold" style={{ color: site.theme.text }}>Exodus Jiu-Jitsu</p>
                  <p className="text-sm" style={{ color: site.theme.textMuted }}>Phoenix, Arizona</p>
                </div>
                <div className="rounded-sm border p-6" style={{ borderColor: site.theme.border, backgroundColor: site.theme.surface }}>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: site.theme.accent }}>Head Instructor</p>
                  <p className="text-lg font-bold" style={{ color: site.theme.text }}>Tommy Schnell</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </EditableSection>

      {/* Testimonial */}
      <EditableSection label="testimonial">
        <section className="px-6 py-16" style={{ backgroundColor: site.theme.surface }}>
          <div className="mx-auto max-w-3xl text-center">
            <blockquote className="mb-4 text-lg font-light italic leading-relaxed" style={{ color: site.theme.text }}>
              &ldquo;I&apos;m looking forward to training at Onyx because it&apos;s a safe, welcoming environment where women can grow in Jiu-Jitsu and feel supported. The community here already feels different — it&apos;s about building each other up.&rdquo;
            </blockquote>
            <p className="text-sm" style={{ color: site.theme.textMuted }}>— Onyx Community Member</p>
          </div>
        </section>
      </EditableSection>

      {/* Contact / CTA */}
      <EditableSection label="contact">
        <section id="contact" className="px-6 py-20" style={{ backgroundColor: site.theme.background }}>
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: site.theme.accent }}>
                Get Started
              </p>
              <h2 className="mb-4 text-3xl font-black uppercase tracking-wide md:text-4xl" style={{ color: site.theme.text }}>
                Your First Class Is Free
              </h2>
              <p className="text-base" style={{ color: site.theme.textMuted }}>
                Come see what we&apos;re building. No experience necessary.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <a
                href="tel:928-651-6311"
                className="group flex flex-col items-center rounded-sm border p-8 transition-colors hover:bg-white/[0.03]"
                style={{ borderColor: site.theme.border }}
              >
                <span className="mb-3 text-2xl">&#x260E;</span>
                <span className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: site.theme.accent }}>Call</span>
                <span className="text-sm" style={{ color: site.theme.text }}>928-651-6311</span>
              </a>

              <a
                href="mailto:info@onyxbjj.com"
                className="group flex flex-col items-center rounded-sm border p-8 transition-colors hover:bg-white/[0.03]"
                style={{ borderColor: site.theme.border }}
              >
                <span className="mb-3 text-2xl">&#x2709;</span>
                <span className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: site.theme.accent }}>Email</span>
                <span className="text-sm" style={{ color: site.theme.text }}>info@onyxbjj.com</span>
              </a>

              <a
                href="https://maps.google.com/?q=408+W+Main+St+Safford+AZ+85546"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center rounded-sm border p-8 transition-colors hover:bg-white/[0.03]"
                style={{ borderColor: site.theme.border }}
              >
                <span className="mb-3 text-2xl">&#x1F4CD;</span>
                <span className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: site.theme.accent }}>Visit</span>
                <span className="text-center text-sm" style={{ color: site.theme.text }}>408 W Main St<br />Safford, AZ 85546</span>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {site.social?.facebook && (
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:brightness-110"
                  style={{ backgroundColor: '#1877F2', color: '#ffffff' }}
                >
                  Facebook
                </a>
              )}
              {site.social?.instagram && (
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:brightness-110"
                  style={{ backgroundColor: '#E4405F', color: '#ffffff' }}
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </section>
      </EditableSection>
    </>
  )
}

function ProgramCard({
  title,
  description,
  schedule,
  accent,
  bg,
  text,
  muted,
}: {
  title: string
  description: string
  schedule: string
  accent: string
  bg: string
  text: string
  muted: string
}) {
  return (
    <div
      className="flex flex-col rounded-sm border-t-2 p-8"
      style={{ borderTopColor: accent, backgroundColor: bg }}
    >
      <h3 className="mb-3 text-xl font-bold uppercase tracking-wide" style={{ color: text }}>
        {title}
      </h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed" style={{ color: muted }}>
        {description}
      </p>
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>
        {schedule}
      </p>
    </div>
  )
}
