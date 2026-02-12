import type { Session } from '@supabase/supabase-js'

import { decodeJWTPayload } from './jwt'
import { customerMappings } from '@/config/customers'

/**
 * Platform role for routing within the hosting platform.
 *
 * - platform_admin: RollOps staff (is_admin or is_developer in JWT)
 * - hosting_customer: Has an active/pending hosted site
 * - owner: Logged-in owner without a hosted site → show sales page
 * - authenticated: Any other valid user → show generic welcome
 */
export type PlatformRole = 'platform_admin' | 'hosting_customer' | 'owner' | 'authenticated'

export interface JWTClaims {
  user_role?: string
  is_admin?: boolean
  is_developer?: boolean
  company_id?: string
}

export function getJWTClaims(session: Session | null): JWTClaims {
  if (!session?.access_token) return {}
  const payload = decodeJWTPayload(session.access_token)
  if (!payload) return {}
  return {
    user_role: payload.user_role as string | undefined,
    is_admin: payload.is_admin === true,
    is_developer: payload.is_developer === true,
    company_id: payload.company_id as string | undefined,
  }
}

export function getPlatformRole(session: Session | null, userId: string | undefined): PlatformRole {
  const claims = getJWTClaims(session)

  // System-level admin or developer → platform admin
  if (claims.is_admin || claims.is_developer) return 'platform_admin'

  // Has a hosted site → hosting customer
  if (userId && customerMappings[userId]) return 'hosting_customer'

  // Owner role in RollOps but no hosted site → show sales page
  if (claims.user_role === 'owner') return 'owner'

  // Any other valid login
  return 'authenticated'
}
