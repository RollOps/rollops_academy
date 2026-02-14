import type { GymEntry } from '@/lib/gymDirectory'

interface GymMarkerProps {
  gym: GymEntry
  isSelected: boolean
  onClick: () => void
}

export function GymMarker({ gym, isSelected, onClick }: GymMarkerProps) {
  const initial = gym.name.charAt(0).toUpperCase()

  return (
    <button
      onClick={onClick}
      className="group relative flex items-center justify-center"
      aria-label={`View ${gym.name}`}
    >
      {/* Outer ring for hosted gyms */}
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-transform ${
          isSelected ? 'scale-125' : 'group-hover:scale-110'
        } ${gym.is_hosted ? 'border-[#37ca37]' : 'border-[#9B1421]'}`}
        style={{ backgroundColor: '#111010' }}
      >
        {gym.logo_url ? (
          <img
            src={gym.logo_url}
            alt={gym.name}
            className="h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <span className="text-sm font-bold text-white">{initial}</span>
        )}
      </div>

      {/* Pin tail */}
      <div
        className={`absolute -bottom-1.5 h-3 w-3 rotate-45 ${
          gym.is_hosted ? 'bg-[#37ca37]' : 'bg-[#9B1421]'
        }`}
        style={{ zIndex: -1 }}
      />
    </button>
  )
}
