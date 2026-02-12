import { useState, type ReactNode } from 'react'

import { useEditMode } from '@/hooks/useEditMode'
import { PLATFORM } from '@/config/platform'

interface EditableSectionProps {
  children: ReactNode
  label?: string
}

export function EditableSection({ children, label }: EditableSectionProps) {
  const { isEditing } = useEditMode()
  const [showTooltip, setShowTooltip] = useState(false)

  if (!isEditing) return <>{children}</>

  return (
    <div className="group relative">
      <div className="rounded-lg border-2 border-dashed border-[#504A4A] transition-colors group-hover:border-[#9B1421]">
        {children}
      </div>
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#9B1421] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
        title={`Edit ${label ?? 'section'}`}
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </button>
      {showTooltip && (
        <div className="absolute right-0 top-8 z-50 w-64 rounded-lg border border-[#504A4A] bg-[#221F1F] p-3 shadow-xl">
          <p className="mb-2 text-xs text-[#E0E0E0]">
            To update this {label ?? 'section'}, use your monthly hours or contact support.
          </p>
          <a
            href={`mailto:${PLATFORM.supportEmail}?subject=Site%20Update%20Request`}
            className="text-xs font-semibold text-[#9B1421] hover:underline"
          >
            Email {PLATFORM.supportEmail}
          </a>
        </div>
      )}
    </div>
  )
}
