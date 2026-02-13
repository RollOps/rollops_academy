import { useState } from 'react'
import type { StorageFile } from '@/lib/storage'

interface MediaGridProps {
  files: StorageFile[]
  isLoading: boolean
  onDelete: (path: string) => Promise<void>
  isDeleting: boolean
}

export function MediaGrid({ files, isLoading, onDelete, isDeleting }: MediaGridProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  async function copyUrl(file: StorageFile) {
    await navigator.clipboard.writeText(file.publicUrl)
    setCopiedId(file.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-xl bg-[#221F1F]" />
        ))}
      </div>
    )
  }

  if (files.length === 0) {
    return (
      <div className="rounded-xl border border-[#504A4A] bg-[#221F1F] p-12 text-center">
        <p className="text-[#E0E0E0]">No files uploaded yet.</p>
        <p className="mt-1 text-sm text-[#504A4A]">Upload images and videos to use on your site.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="group relative overflow-hidden rounded-xl border border-[#504A4A] bg-[#221F1F]"
        >
          <div className="aspect-square">
            {file.isImage ? (
              <img
                src={file.publicUrl}
                alt={file.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#1a1818]">
                <FileIcon contentType={file.contentType} />
                <span className="text-xs text-[#504A4A]">
                  {file.contentType?.split('/')[1]?.toUpperCase() ?? 'FILE'}
                </span>
              </div>
            )}
          </div>

          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
            <div className="p-3">
              <p className="mb-2 truncate text-xs text-white">{file.name}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => copyUrl(file)}
                  className="flex-1 rounded-lg bg-[#9B1421] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#7A0F1A]"
                >
                  {copiedId === file.id ? 'Copied!' : 'Copy URL'}
                </button>
                <button
                  onClick={() => onDelete(file.path)}
                  disabled={isDeleting}
                  className="rounded-lg border border-[#504A4A] px-3 py-1.5 text-xs text-[#E0E0E0] transition-colors hover:border-red-500 hover:text-red-400 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FileIcon({ contentType }: { contentType: string | undefined }) {
  if (contentType?.startsWith('video/')) {
    return (
      <svg className="h-12 w-12 text-[#504A4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    )
  }
  if (contentType === 'application/pdf') {
    return (
      <svg className="h-12 w-12 text-[#504A4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    )
  }
  return (
    <svg className="h-12 w-12 text-[#504A4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  )
}
