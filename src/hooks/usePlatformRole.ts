import { useAuth } from '@/providers/AuthProvider'
import { useCustomerSite } from './useCustomerSite'
import { getPlatformRole, type PlatformRole } from '@/lib/roles'

export function usePlatformRole(): { role: PlatformRole | null; isLoading: boolean } {
  const { session, isAuthenticated, loading: authLoading } = useAuth()
  const { customer, isLoading: profileLoading } = useCustomerSite()

  if (authLoading || profileLoading) {
    return { role: null, isLoading: true }
  }

  if (!isAuthenticated) {
    return { role: null, isLoading: false }
  }

  const role = getPlatformRole(session, !!customer)
  return { role, isLoading: false }
}
