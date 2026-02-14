import type { GymEntry } from '@/lib/gymDirectory'

interface GymCardProps {
  gym: GymEntry
  isSelected: boolean
  onClick: () => void
}

export function GymCard({ gym, isSelected, onClick }: GymCardProps) {
  const initial = gym.name.charAt(0).toUpperCase()
  const gymUrl = gym.is_hosted && gym.hosted_url ? gym.hosted_url : gym.website_url

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-4 transition-colors ${
        isSelected
          ? 'border-[#9B1421] bg-[#221F1F]'
          : 'border-[#504A4A] bg-[#111010] hover:border-[#9B1421]/50'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick() }}
    >
      <div className="flex gap-4">
        {/* Logo */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#221F1F] border border-[#504A4A]">
          {gym.logo_url ? (
            <img
              src={gym.logo_url}
              alt={gym.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-[#9B1421]">{initial}</span>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              {gymUrl ? (
                <a
                  href={gymUrl}
                  onClick={(e) => e.stopPropagation()}
                  className="truncate text-sm font-bold text-white hover:text-[#9B1421] transition-colors block"
                >
                  {gym.name}
                </a>
              ) : (
                <h3 className="truncate text-sm font-bold text-white">{gym.name}</h3>
              )}
              <p className="text-xs text-[#E0E0E0]">
                {gym.city}, {gym.state}
              </p>
            </div>
            {gym.google_rating && (
              <div className="shrink-0 text-right">
                <div className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-semibold text-white">{gym.google_rating.toFixed(1)}</span>
                </div>
                {gym.google_review_count != null && (
                  <p className="text-[10px] text-[#E0E0E0]">({gym.google_review_count})</p>
                )}
              </div>
            )}
          </div>

          {gym.slogan && (
            <p className="mt-1 truncate text-xs italic text-[#E0E0E0]">{gym.slogan}</p>
          )}

          {/* Hosted badge */}
          {gym.is_hosted && (
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#37ca37]/10 px-2 py-0.5 text-[10px] font-semibold text-[#37ca37]">
              <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              RollOps Pro
            </span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-3 flex flex-col gap-2 border-t border-[#504A4A]/50 pt-3">
        {/* Primary CTA — Visit Page */}
        {gymUrl && (
          <a
            href={gymUrl}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#9B1421] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#7A0F1A]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            {gym.is_hosted ? 'Visit Page' : 'Website'}
          </a>
        )}

        {/* Secondary actions */}
        <div className="flex flex-wrap gap-2">
          {gym.phone && (
            <a
              href={`tel:${gym.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 rounded-lg bg-[#221F1F] px-3 py-1.5 text-xs font-medium text-[#E0E0E0] transition-colors hover:bg-[#504A4A]/50 hover:text-white"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call
            </a>
          )}
          {gym.email && (
            <a
              href={`mailto:${gym.email}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 rounded-lg bg-[#221F1F] px-3 py-1.5 text-xs font-medium text-[#E0E0E0] transition-colors hover:bg-[#504A4A]/50 hover:text-white"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Email
            </a>
          )}
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${gym.lat},${gym.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 rounded-lg bg-[#221F1F] px-3 py-1.5 text-xs font-medium text-[#E0E0E0] transition-colors hover:bg-[#504A4A]/50 hover:text-white"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            Directions
          </a>
        </div>
      </div>
    </div>
  )
}
