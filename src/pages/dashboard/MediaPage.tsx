import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '@/providers/AuthProvider'
import { useMediaUpload } from '@/hooks/useMediaUpload'
import { UploadZone } from '@/components/media/UploadZone'
import { MediaGrid } from '@/components/media/MediaGrid'

export function MediaPage() {
  const { user, signOut } = useAuth()
  const {
    subdomain,
    files,
    isLoading,
    isError,
    error,
    upload,
    isUploading,
    deleteFile,
    isDeleting,
  } = useMediaUpload()

  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [lastError, setLastError] = useState<string | null>(null)

  const handleFilesSelected = useCallback(async (selectedFiles: File[]) => {
    setLastError(null)
    for (const file of selectedFiles) {
      setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }))
      try {
        await upload({
          file,
          onProgress: (percent) => {
            setUploadProgress((prev) => ({ ...prev, [file.name]: percent }))
          },
        })
      } catch (err) {
        setLastError(err instanceof Error ? err.message : 'Upload failed')
      } finally {
        setUploadProgress((prev) => {
          const next = { ...prev }
          delete next[file.name]
          return next
        })
      }
    }
  }, [upload])

  const handleDelete = useCallback(async (path: string) => {
    if (!window.confirm('Delete this file? This cannot be undone.')) return
    try {
      await deleteFile(path)
    } catch (err) {
      setLastError(err instanceof Error ? err.message : 'Delete failed')
    }
  }, [deleteFile])

  return (
    <div className="min-h-screen bg-[#111010] text-white">
      {/* Top Bar */}
      <header className="border-b border-[#504A4A] bg-[#221F1F] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/rollops-logo.png" alt="RollOps" className="h-8 w-8" />
            <span className="text-lg font-bold text-[#EBFFEE]">
              Roll<span className="text-[#9B1421]">O</span>ps Pro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-[#E0E0E0] sm:block">{user?.email}</span>
            <button
              onClick={signOut}
              className="rounded-lg border border-[#504A4A] px-4 py-2 text-sm text-[#E0E0E0] transition-colors hover:border-white hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Link to="/dashboard" className="text-sm text-[#9B1421] hover:underline">&larr; Dashboard</Link>
          <h1 className="text-3xl font-bold">Media</h1>
          {subdomain && (
            <span className="rounded-lg bg-[#221F1F] px-3 py-1 text-xs text-[#504A4A]">
              {subdomain}
            </span>
          )}
        </div>

        {(lastError || isError) && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-900/20 px-4 py-3 text-sm text-red-300">
            {lastError || (error instanceof Error ? error.message : 'Failed to load files')}
            <button
              onClick={() => setLastError(null)}
              className="ml-2 text-red-400 hover:text-red-300"
            >
              &times;
            </button>
          </div>
        )}

        {subdomain ? (
          <>
            <div className="mb-8">
              <UploadZone
                onFilesSelected={handleFilesSelected}
                isUploading={isUploading}
                uploadProgress={uploadProgress}
              />
            </div>

            <MediaGrid
              files={files}
              isLoading={isLoading}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          </>
        ) : (
          <div className="rounded-xl border border-[#504A4A] bg-[#221F1F] p-8 text-center">
            <p className="text-[#E0E0E0]">
              No site assigned yet. Media uploads will be available once your site is set up.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
