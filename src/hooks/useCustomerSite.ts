import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/providers/AuthProvider'
import { fetchProfileByUserId, type CustomerProfile } from '@/lib/customerProfile'

export function useCustomerSite(): { customer: CustomerProfile | null; isLoading: boolean } {
  const { user } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['customer-profile', user?.id],
    queryFn: () => fetchProfileByUserId(user!.id),
    enabled: !!user,
  })

  return {
    customer: data ?? null,
    isLoading,
  }
}
