import { useMemo } from 'react'

import { useAuth } from '@/providers/AuthProvider'
import { getPlatformRole, type PlatformRole } from '@/lib/roles'

export function usePlatformRole(): PlatformRole | null {
  const { user, session, isAuthenticated } = useAuth()

  return useMemo(() => {
    if (!isAuthenticated) return null
    return getPlatformRole(session, user?.id)
  }, [isAuthenticated, session, user?.id])
}
