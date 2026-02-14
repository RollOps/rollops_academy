import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { useCustomerSite } from './useCustomerSite'
import { usePlatformRole } from './usePlatformRole'
import {
  listFiles,
  uploadFile,
  deleteFile,
  validateFile,
  type StorageFile,
} from '@/lib/storage'

const QUERY_KEY = 'media-files'

export function useMediaUpload(subdomainOverride?: string) {
  const { customer } = useCustomerSite()
  const { role } = usePlatformRole()
  const queryClient = useQueryClient()

  const subdomain = subdomainOverride ?? customer?.subdomain ?? null

  const filesQuery = useQuery<StorageFile[]>({
    queryKey: [QUERY_KEY, subdomain],
    queryFn: () => {
      if (!subdomain) return Promise.resolve([])
      return listFiles(subdomain)
    },
    enabled: !!subdomain,
  })

  const uploadMutation = useMutation({
    mutationFn: async ({
      file,
      onProgress,
    }: {
      file: File
      onProgress?: (percent: number) => void
    }) => {
      if (!subdomain) throw new Error('No subdomain available')
      const validationError = validateFile(file)
      if (validationError) throw new Error(validationError)
      return uploadFile(subdomain, file, onProgress)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, subdomain] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (path: string) => deleteFile(path),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, subdomain] })
    },
  })

  return {
    subdomain,
    files: filesQuery.data ?? [],
    isLoading: filesQuery.isLoading,
    isError: filesQuery.isError,
    error: filesQuery.error,
    refetch: filesQuery.refetch,

    upload: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    uploadError: uploadMutation.error,

    deleteFile: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,

    isAdmin: role === 'platform_admin',
  }
}
