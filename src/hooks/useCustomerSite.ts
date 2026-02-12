import { useMemo } from 'react'

import { useAuth } from '@/providers/AuthProvider'
import { customerMappings } from '@/config/customers'

export function useCustomerSite() {
  const { user } = useAuth()

  return useMemo(() => {
    if (!user) return null
    return customerMappings[user.id] ?? null
  }, [user])
}
