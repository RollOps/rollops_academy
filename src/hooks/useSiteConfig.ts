import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { type SiteConfig, siteRegistry, defaultSiteConfig } from '@/config/sites'
import { getSubdomain } from '@/lib/subdomain'
import { fetchProfileBySubdomain, buildSiteConfigFromProfile } from '@/lib/customerProfile'

/**
 * Returns the site configuration for the current subdomain.
 *
 * Lookup order:
 * 1. Static siteRegistry (custom-built sites like OnyxHome) — instant, no loading
 * 2. customer_profiles table by subdomain — async via React Query
 * 3. Falls back to the default RollOps platform config
 */
export function useSiteConfig(): { site: SiteConfig; isLoading: boolean } {
  const subdomain = useMemo(() => getSubdomain(), [])

  // Check static registry first (custom-built sites)
  const staticConfig = subdomain ? siteRegistry[subdomain] ?? null : null

  // Query DB for unknown subdomains
  const { data: profile, isLoading } = useQuery({
    queryKey: ['site-profile', subdomain],
    queryFn: () => fetchProfileBySubdomain(subdomain!),
    enabled: !!subdomain && !staticConfig,
  })

  if (!subdomain) {
    return { site: defaultSiteConfig, isLoading: false }
  }

  if (staticConfig) {
    return { site: staticConfig, isLoading: false }
  }

  if (profile) {
    return { site: buildSiteConfigFromProfile(profile), isLoading: false }
  }

  // Still loading or no profile found — return default with subdomain set
  // so App.tsx knows we're in subdomain mode
  if (isLoading) {
    return {
      site: { ...defaultSiteConfig, subdomain },
      isLoading: true,
    }
  }

  // Subdomain exists but no profile found — show "site not found"
  return {
    site: { ...defaultSiteConfig, subdomain },
    isLoading: false,
  }
}
