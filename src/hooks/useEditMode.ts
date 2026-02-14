import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useAuth } from '@/providers/AuthProvider'
import { useCustomerSite } from '@/hooks/useCustomerSite'
import { getSubdomain } from '@/lib/subdomain'

export function useEditMode() {
  const { isAuthenticated } = useAuth()
  const { customer } = useCustomerSite()
  const [searchParams] = useSearchParams()

  const subdomain = getSubdomain()
  const isOwner = !!customer && customer.subdomain === subdomain

  const editParam = searchParams.get('edit') === 'true'
  const [isEditing, setIsEditing] = useState(editParam)

  return {
    canEdit: isAuthenticated && isOwner,
    isEditing: isAuthenticated && isOwner && isEditing,
    setIsEditing,
  }
}
