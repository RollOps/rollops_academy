import { useQuery } from '@tanstack/react-query'
import { fetchGymDirectory, type GymEntry } from '@/lib/gymDirectory'

export function useGymDirectory(params?: { search?: string; state?: string }) {
  return useQuery<GymEntry[]>({
    queryKey: ['gym-directory', params?.search, params?.state],
    queryFn: () => fetchGymDirectory(params),
    staleTime: 1000 * 60 * 5,
  })
}
