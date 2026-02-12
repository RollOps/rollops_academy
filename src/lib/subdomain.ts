/**
 * Subdomain Detection
 *
 * Extracts the subdomain from the current hostname to determine
 * which gym site to render.
 *
 * Supports:
 *   - Production: onyx.rollops.academy -> "onyx"
 *   - Local dev:  onyx.localhost:5173  -> "onyx"
 *   - Fallback:   localhost:5173       -> null (shows landing page)
 */

const PRODUCTION_DOMAINS = ['rollops.academy', 'rollops.pro']

export function getSubdomain(): string | null {
  const hostname = window.location.hostname

  // Local development: onyx.localhost -> "onyx"
  if (hostname.endsWith('.localhost') || hostname.endsWith('.local')) {
    const sub = hostname.split('.')[0]
    return sub === 'localhost' ? null : sub
  }

  // Production: onyx.rollops.academy -> "onyx"
  for (const domain of PRODUCTION_DOMAINS) {
    if (hostname.endsWith(domain)) {
      const sub = hostname.replace(`.${domain}`, '')
      return sub === domain || sub === '' ? null : sub
    }
  }

  // Query param override for development: ?site=onyx
  const params = new URLSearchParams(window.location.search)
  const siteParam = params.get('site')
  if (siteParam) return siteParam

  return null
}
