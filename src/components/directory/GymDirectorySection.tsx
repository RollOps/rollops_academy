import { useState, useCallback, useMemo, useEffect } from 'react'
import { APIProvider } from '@vis.gl/react-google-maps'
import { useGymDirectory } from '@/hooks/useGymDirectory'
import { GymMap } from './GymMap'
import { GymSearchBar } from './GymSearchBar'
import { GymDetailPanel } from './GymDetailPanel'

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY as string

export function GymDirectorySection() {
  const [search, setSearch] = useState('')
  const [stateFilter, setStateFilter] = useState('')
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null)

  // Fetch all gyms once — all filtering is client-side for instant results
  const { data: allGyms = [], isLoading, error } = useGymDirectory()

  // Client-side filtering — no flicker, no re-fetch
  const filteredGyms = useMemo(() => {
    let result = allGyms
    if (stateFilter) {
      result = result.filter((g) => g.state === stateFilter)
    }
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((g) =>
        g.name.toLowerCase().includes(q) ||
        g.city.toLowerCase().includes(q) ||
        g.state.toLowerCase().includes(q)
      )
    }
    return result
  }, [allGyms, search, stateFilter])

  const selectedGym = useMemo(
    () => filteredGyms.find((g) => g.id === selectedGymId) ?? null,
    [filteredGyms, selectedGymId],
  )

  // Unique states from full dataset
  const states = useMemo(() => {
    const unique = [...new Set(allGyms.map((g) => g.state).filter(Boolean))]
    return unique.sort()
  }, [allGyms])

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const handleStateChange = useCallback((value: string) => {
    setStateFilter(value)
    setSelectedGymId(null)
  }, [])

  const handleSelectGym = useCallback((id: string) => {
    setSelectedGymId(id)
    setSearch('')
  }, [])

  const handleDeselectGym = useCallback(() => {
    setSelectedGymId(null)
  }, [])

  // Clear selection if it's no longer in filtered results
  useEffect(() => {
    if (selectedGymId && !filteredGyms.find((g) => g.id === selectedGymId)) {
      setSelectedGymId(null)
    }
  }, [filteredGyms, selectedGymId])

  return (
    <APIProvider apiKey={GOOGLE_MAPS_KEY}>
      {/* Full-bleed map container */}
      <div className="relative h-[calc(100vh-140px)] min-h-[400px] w-full overflow-hidden rounded-2xl border border-[#504A4A]">

        {/* Map fills entire container */}
        <div className="absolute inset-0">
          <GymMap
            gyms={filteredGyms}
            selectedGymId={selectedGymId}
            onSelectGym={handleSelectGym}
          />
        </div>

        {/* Floating search bar — glass overlay at top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-3">
          <div className="pointer-events-auto mx-auto max-w-2xl rounded-2xl border border-white/10 bg-black/50 px-4 py-3 shadow-2xl backdrop-blur-xl">
            <GymSearchBar
              search={search}
              onSearchChange={handleSearchChange}
              onStateChange={handleStateChange}
              onSelectGym={handleSelectGym}
              states={states}
              results={filteredGyms}
              resultCount={filteredGyms.length}
            />
          </div>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#9B1421]" />
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center px-4">
            <div className="rounded-xl border border-red-900/50 bg-red-900/80 px-6 py-3 text-sm text-red-100 shadow-lg backdrop-blur-lg">
              Failed to load gym directory. Please try again later.
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && filteredGyms.length === 0 && (
          <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center px-4">
            <div className="rounded-xl border border-white/10 bg-black/60 px-6 py-3 text-sm text-white/60 shadow-lg backdrop-blur-lg">
              No gyms found matching your search.
            </div>
          </div>
        )}

        {/* Detail panel — fills from below search bar to bottom with padding gap */}
        <div
          className={`absolute inset-x-0 bottom-0 top-[80px] z-10 transition-transform duration-300 ease-out ${
            selectedGym ? 'translate-y-0' : 'translate-y-full'
          } p-3`}
        >
          {selectedGym && (
            <GymDetailPanel gym={selectedGym} onClose={handleDeselectGym} />
          )}
        </div>
      </div>
    </APIProvider>
  )
}
