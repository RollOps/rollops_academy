import { useCallback, useEffect, useMemo } from 'react'
import { Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps'
import type { GymEntry } from '@/lib/gymDirectory'
import { GymMarker } from './GymMarker'

// Map ID required for AdvancedMarker support.
// Use VITE_GOOGLE_MAP_ID for a custom cloud-styled map, or fall back to DEMO_MAP_ID.
const MAP_ID = (import.meta.env.VITE_GOOGLE_MAP_ID as string) || 'DEMO_MAP_ID'

// US center as default
const DEFAULT_CENTER = { lat: 39.8283, lng: -98.5795 }
const DEFAULT_ZOOM = 4

interface GymMapProps {
  gyms: GymEntry[]
  selectedGymId: string | null
  onSelectGym: (id: string) => void
}

function MapBoundsUpdater({ gyms }: { gyms: GymEntry[] }) {
  const map = useMap()

  useEffect(() => {
    if (!map || gyms.length === 0 || typeof google === 'undefined') return

    const bounds = new google.maps.LatLngBounds()
    gyms.forEach((gym) => {
      bounds.extend({ lat: gym.lat, lng: gym.lng })
    })
    map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 })
  }, [map, gyms])

  return null
}

export function GymMap({ gyms, selectedGymId, onSelectGym }: GymMapProps) {
  const map = useMap()

  const selectedGym = useMemo(
    () => gyms.find((g) => g.id === selectedGymId) ?? null,
    [gyms, selectedGymId],
  )

  const centerOnGym = useCallback((gym: GymEntry) => {
    if (map) {
      map.panTo({ lat: gym.lat, lng: gym.lng })
      map.setZoom(14)
    }
  }, [map])

  // Center on selected gym when it changes
  useEffect(() => {
    if (selectedGym) centerOnGym(selectedGym)
  }, [selectedGym, centerOnGym])

  return (
    <Map
      defaultCenter={DEFAULT_CENTER}
      defaultZoom={DEFAULT_ZOOM}
      mapId={MAP_ID}
      gestureHandling="greedy"
      disableDefaultUI
      zoomControl
      className="h-full w-full rounded-xl"
    >
      <MapBoundsUpdater gyms={gyms} />
      {gyms.map((gym) => (
        <AdvancedMarker
          key={gym.id}
          position={{ lat: gym.lat, lng: gym.lng }}
          zIndex={gym.id === selectedGymId ? 10 : 1}
        >
          <GymMarker
            gym={gym}
            isSelected={gym.id === selectedGymId}
            onClick={() => onSelectGym(gym.id)}
          />
        </AdvancedMarker>
      ))}

    </Map>
  )
}
