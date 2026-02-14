import { useState, useRef, useEffect } from 'react'
import type { GymEntry } from '@/lib/gymDirectory'

interface GymSearchBarProps {
  search: string
  onSearchChange: (search: string) => void
  onStateChange: (state: string) => void
  onSelectGym: (id: string) => void
  states: string[]
  results: GymEntry[]
  resultCount: number
}

export function GymSearchBar({
  search,
  onSearchChange,
  onStateChange,
  onSelectGym,
  states,
  results,
  resultCount,
}: GymSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const showDropdown = isFocused && search.length > 0

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {/* Search input with autocomplete */}
      <div className="relative flex-1" ref={wrapperRef}>
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Search gyms..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-16 text-sm text-white placeholder-white/40 outline-none backdrop-blur-sm transition-colors focus:border-white/25"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/50">
          {resultCount}
        </span>

        {/* Autocomplete dropdown */}
        {showDropdown && (
          <div className="absolute inset-x-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-xl border border-white/10 bg-black/80 py-1 shadow-2xl backdrop-blur-xl">
            {results.length === 0 ? (
              <div className="px-4 py-3 text-center text-sm text-white/40">
                No gyms found
              </div>
            ) : (
              results.map((gym) => (
                <button
                  key={gym.id}
                  onClick={() => {
                    onSelectGym(gym.id)
                    setIsFocused(false)
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/10"
                >
                  {/* Logo */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    {gym.logo_url ? (
                      <img src={gym.logo_url} alt="" className="h-6 w-6 rounded-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-[#9B1421]">
                        {gym.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{gym.name}</p>
                    <p className="truncate text-xs text-white/40">{gym.city}, {gym.state}</p>
                  </div>
                  {/* Rating */}
                  {gym.google_rating && (
                    <div className="flex shrink-0 items-center gap-1">
                      <svg className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs text-white/50">{gym.google_rating.toFixed(1)}</span>
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* State filter */}
      <select
        onChange={(e) => onStateChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm transition-colors focus:border-white/25"
        defaultValue=""
      >
        <option value="">All States</option>
        {states.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  )
}
