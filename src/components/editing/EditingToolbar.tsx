import { useEditMode } from '@/hooks/useEditMode'
import { PLATFORM } from '@/config/platform'

export function EditingToolbar() {
  const { canEdit, isEditing, setIsEditing } = useEditMode()

  if (!canEdit) return null

  return (
    <div className="flex items-center justify-between border-b border-[#504A4A] bg-[#221F1F] px-4 py-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <img src="/rollops-logo.png" alt="" className="h-5 w-5" />
          <span className="text-xs font-semibold text-[#EBFFEE]">
            Roll<span className="text-[#9B1421]">O</span>ps Pro
          </span>
        </div>
        <span className="text-xs text-[#E0E0E0]">|</span>
        <span className="text-xs text-[#E0E0E0]">
          {isEditing ? 'Editing your site' : 'Viewing your site'}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`rounded px-3 py-1 text-xs font-semibold transition-colors ${
            isEditing
              ? 'bg-[#9B1421] text-white'
              : 'border border-[#504A4A] text-[#E0E0E0] hover:border-white hover:text-white'
          }`}
        >
          {isEditing ? 'Exit Edit Mode' : 'Edit Mode'}
        </button>
        <a
          href="/dashboard"
          className="rounded border border-[#504A4A] px-3 py-1 text-xs text-[#E0E0E0] transition-colors hover:border-white hover:text-white"
        >
          Dashboard
        </a>
        <a
          href={`mailto:${PLATFORM.supportEmail}`}
          className="text-xs text-[#E0E0E0] hover:text-white"
        >
          Support
        </a>
      </div>
    </div>
  )
}
