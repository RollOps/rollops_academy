import { supabase } from './supabase'

const BUCKET = 'site-assets'

export interface StorageFile {
  id: string
  name: string
  path: string
  publicUrl: string
  contentType: string | undefined
  size: number
  createdAt: string
  isImage: boolean
}

function buildPath(subdomain: string, filename: string): string {
  return `${subdomain}/${filename}`
}

export function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function listFiles(subdomain: string): Promise<StorageFile[]> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(subdomain, {
      limit: 200,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    })

  if (error) throw error
  if (!data) return []

  return data
    .filter((file) => file.name !== '.emptyFolderPlaceholder')
    .map((file) => {
      const path = buildPath(subdomain, file.name)
      const contentType = file.metadata?.mimetype as string | undefined
      return {
        id: file.id,
        name: file.name,
        path,
        publicUrl: getPublicUrl(path),
        contentType,
        size: (file.metadata?.size as number) ?? 0,
        createdAt: file.created_at,
        isImage: contentType?.startsWith('image/') ?? false,
      }
    })
}

export async function uploadFile(
  subdomain: string,
  file: File,
  onProgress?: (percent: number) => void,
): Promise<StorageFile> {
  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const filename = `${timestamp}-${safeName}`
  const path = buildPath(subdomain, filename)

  onProgress?.(0)

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (error) throw error

  onProgress?.(100)

  return {
    id: path,
    name: filename,
    path,
    publicUrl: getPublicUrl(path),
    contentType: file.type,
    size: file.size,
    createdAt: new Date().toISOString(),
    isImage: file.type.startsWith('image/'),
  }
}

export async function deleteFile(path: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) throw error
}

export const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'video/mp4', 'video/webm', 'video/quicktime',
  'application/pdf',
]

export const MAX_FILE_SIZE = 50 * 1024 * 1024

export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `File type "${file.type}" is not supported. Use images, videos, or PDFs.`
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum is 50MB.`
  }
  return null
}
