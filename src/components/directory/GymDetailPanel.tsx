import { useMemo } from 'react'
import type { GymEntry } from '@/lib/gymDirectory'

interface GymDetailPanelProps {
  gym: GymEntry
  onClose: () => void
}

/** Generate the next 3 upcoming class slots relative to now. */
function getUpcomingClasses() {
  const classes = [
    { name: 'Fundamentals', day: 1, hour: 10, min: 0, duration: 60 },
    { name: 'No-Gi', day: 1, hour: 18, min: 30, duration: 90 },
    { name: 'All Levels', day: 2, hour: 11, min: 0, duration: 60 },
    { name: 'Competition Team', day: 2, hour: 18, min: 0, duration: 90 },
    { name: 'Fundamentals', day: 3, hour: 10, min: 0, duration: 60 },
    { name: 'Open Mat', day: 3, hour: 12, min: 0, duration: 120 },
    { name: 'No-Gi', day: 3, hour: 18, min: 30, duration: 90 },
    { name: 'All Levels', day: 4, hour: 11, min: 0, duration: 60 },
    { name: 'Fundamentals', day: 4, hour: 18, min: 0, duration: 60 },
    { name: 'Competition Team', day: 5, hour: 10, min: 0, duration: 90 },
    { name: 'No-Gi', day: 5, hour: 18, min: 30, duration: 90 },
    { name: 'Open Mat', day: 6, hour: 10, min: 0, duration: 120 },
  ]

  const now = new Date()
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const upcoming: { name: string; dateLabel: string; time: string; duration: number }[] = []

  for (let offset = 0; offset < 7 && upcoming.length < 3; offset++) {
    const date = new Date(now)
    date.setDate(now.getDate() + offset)
    const dayOfWeek = date.getDay()

    for (const cls of classes) {
      if (upcoming.length >= 3) break
      if (cls.day !== dayOfWeek) continue

      const classTime = new Date(date)
      classTime.setHours(cls.hour, cls.min, 0, 0)
      if (classTime <= now) continue

      const h = cls.hour > 12 ? cls.hour - 12 : cls.hour
      const ampm = cls.hour >= 12 ? 'PM' : 'AM'
      const minStr = cls.min === 0 ? '00' : String(cls.min)

      upcoming.push({
        name: cls.name,
        dateLabel: offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : dayNames[dayOfWeek],
        time: `${h}:${minStr} ${ampm}`,
        duration: cls.duration,
      })
    }
  }

  return upcoming
}

export function GymDetailPanel({ gym, onClose }: GymDetailPanelProps) {
  const initial = gym.name.charAt(0).toUpperCase()
  // All gyms can sign up via rollops.pro — gym.id IS the company UUID in the shared DB
  const signupUrl = `https://rollops.pro/signup/${gym.id}`

  const upcomingClasses = useMemo(() => getUpcomingClasses(), [])

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-black/50 to-black/80 backdrop-blur-xl">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-5 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <img src="/rollops-logo.png" alt="RollOps" className="h-5 w-5" />
          <span className="text-xs font-bold text-[#EBFFEE]">
            Roll<span className="text-[#9B1421]">O</span>ps Pro
          </span>
          <span className="text-[10px] font-medium text-white/30">Academy</span>
        </div>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Two-column body: Company Details | Upcoming Classes */}
      <div className="flex min-h-0 flex-1">
        {/* Left column — Company Details */}
        <div className="flex w-1/2 flex-col overflow-y-auto border-r border-white/5 py-4">
          {/* Gym logo + name */}
          <div className="flex items-center gap-4 px-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
              {gym.logo_url ? (
                <img src={gym.logo_url} alt={gym.name} className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <span className="text-xl font-bold text-[#9B1421]">{initial}</span>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white">{gym.name}</h3>
              <p className="text-sm text-white/60">{gym.city}, {gym.state}</p>
              {gym.is_hosted && (
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#37ca37]/10 px-2 py-0.5 text-[10px] font-semibold text-[#37ca37]">
                  <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  RollOps Pro
                </span>
              )}
            </div>
          </div>

          {/* Slogan */}
          {gym.slogan && (
            <p className="mt-3 px-5 text-sm italic text-white/50">"{gym.slogan}"</p>
          )}

          {/* Address */}
          {gym.address && (
            <div className="mt-4 px-5">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">Address</p>
              <p className="mt-1 text-sm text-white/80">
                {gym.address}
                {gym.city && `, ${gym.city}`}
                {gym.state && `, ${gym.state}`}
                {gym.zip && ` ${gym.zip}`}
              </p>
            </div>
          )}

          {/* Google Reviews */}
          <div className="mt-4 px-5">
            <p className="text-xs font-medium uppercase tracking-wider text-white/40">Google Reviews</p>
            {gym.google_rating ? (
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-4 w-4 ${star <= Math.round(gym.google_rating!) ? 'text-yellow-400' : 'text-white/15'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-white">{gym.google_rating.toFixed(1)}</span>
                {gym.google_review_count != null && (
                  <span className="text-xs text-white/40">({gym.google_review_count} reviews)</span>
                )}
              </div>
            ) : (
              <p className="mt-1.5 text-sm text-white/30">No reviews yet</p>
            )}
          </div>

          {/* Quick actions */}
          <div className="mt-auto flex gap-2 px-5 pt-4">
            {gym.phone && (
              <a
                href={`tel:${gym.phone}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call
              </a>
            )}
            {gym.email && (
              <a
                href={`mailto:${gym.email}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Email
              </a>
            )}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${gym.lat},${gym.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Directions
            </a>
          </div>
        </div>

        {/* Right column — Upcoming Classes */}
        <div className="flex w-1/2 flex-col overflow-y-auto py-4">
          <p className="px-5 text-xs font-medium uppercase tracking-wider text-white/40">Upcoming Classes</p>

          {/* Class cards — fill available space */}
          <div className="mt-3 flex flex-1 flex-col gap-2 px-5">
            {upcomingClasses.length > 0 ? (
              upcomingClasses.map((cls, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{cls.name}</p>
                    <p className="text-xs text-white/50">{cls.dateLabel} &middot; {cls.time}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/60">
                    {cls.duration} min
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-1 items-center justify-center text-sm text-white/30">
                No upcoming classes
              </div>
            )}
          </div>

          {/* Sign Up for Class Today — pinned to bottom of right column */}
          <div className="mt-auto px-5 pt-4">
            <a
              href={signupUrl}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#37ca37] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#37ca37]/20 transition-colors hover:bg-[#2ea82e]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Sign Up for Class Today
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
