import { useMemo } from 'react'

import { type SiteConfig, siteRegistry, defaultSiteConfig } from '@/config/sites'
import { getSubdomain } from '@/lib/subdomain'

/**
 * Returns the site configuration for the current subdomain.
 * Falls back to the default RollOps Academy landing config.
 */
export function useSiteConfig(): SiteConfig {
  return useMemo(() => {
    const subdomain = getSubdomain()
    if (subdomain && siteRegistry[subdomain]) {
      return siteRegistry[subdomain]
    }
    return defaultSiteConfig
  }, [])
}
