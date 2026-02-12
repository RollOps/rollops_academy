import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useAuth } from '@/providers/AuthProvider'
import { useSiteConfig } from '@/hooks/useSiteConfig'
import { customerMappings } from '@/config/customers'

export function useEditMode() {
  const { user, isAuthenticated } = useAuth()
  const site = useSiteConfig()
  const [searchParams] = useSearchParams()

  const isOwner = useMemo(() => {
    if (!user || !site.subdomain) return false
    const mapping = customerMappings[user.id]
    return mapping?.subdomain === site.subdomain
  }, [user, site.subdomain])

  const editParam = searchParams.get('edit') === 'true'
  const [isEditing, setIsEditing] = useState(editParam)

  return {
    canEdit: isAuthenticated && isOwner,
    isEditing: isAuthenticated && isOwner && isEditing,
    setIsEditing,
  }
}
