import { useState, useRef, useCallback, type DragEvent } from 'react'

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void
  isUploading: boolean
  uploadProgress: Record<string, number>
}

export function UploadZone({ onFilesSelected, isUploading, uploadProgress }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) onFilesSelected(files)
  }, [onFilesSelected])

  const handleFileInput = useCallback(() => {
    const files = inputRef.current?.files
    if (files && files.length > 0) {
      onFilesSelected(Array.from(files))
      if (inputRef.current) inputRef.current.value = ''
    }
  }, [onFilesSelected])

  const activeUploads = Object.entries(uploadProgress)

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && inputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          isDragOver
            ? 'border-[#9B1421] bg-[#9B1421]/10'
            : 'border-[#504A4A] bg-[#221F1F] hover:border-[#9B1421]/50'
        } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
      >
        <svg className="mx-auto mb-3 h-10 w-10 text-[#504A4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
        </svg>
        <p className="text-sm text-[#E0E0E0]">
          Drag &amp; drop files here, or <span className="font-semibold text-[#9B1421]">browse</span>
        </p>
        <p className="mt-1 text-xs text-[#504A4A]">
          Images, videos, or PDFs up to 50MB
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {activeUploads.length > 0 && (
        <div className="mt-4 space-y-2">
          {activeUploads.map(([name, percent]) => (
            <div key={name} className="flex items-center gap-3 rounded-lg bg-[#221F1F] px-4 py-2">
              <span className="flex-1 truncate text-sm text-[#E0E0E0]">{name}</span>
              <div className="h-2 w-24 overflow-hidden rounded-full bg-[#504A4A]">
                <div
                  className="h-full rounded-full bg-[#9B1421] transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs text-[#504A4A]">{percent}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
