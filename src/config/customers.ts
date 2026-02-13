/**
 * Customer-to-site mapping.
 * Temporary config-based approach — replace with Supabase table later.
 */

export interface CustomerMapping {
  userId: string
  subdomain: string
  siteName: string
  initialHoursUsed: number
  monthlyHoursUsed: number
  status: 'pending' | 'active' | 'suspended'
}

/**
 * Map of Supabase user IDs to their hosting config.
 * Populate with actual user IDs after customers sign up.
 */
export const customerMappings: Record<string, CustomerMapping> = {
  // Example:
  // 'uuid-from-supabase': {
  //   userId: 'uuid-from-supabase',
  //   subdomain: 'onyxbjj',
  //   siteName: 'Onyx BJJ',
  //   initialHoursUsed: 3,
  //   monthlyHoursUsed: 1,
  //   status: 'pending',
  // },
}
