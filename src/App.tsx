import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useSiteConfig } from '@/hooks/useSiteConfig'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { OnyxHome } from '@/sites/onyx-bjj/pages/OnyxHome'

/**
 * Root application component.
 *
 * Detects the current subdomain and renders the appropriate gym site.
 * If no subdomain is detected, shows the RollOps Academy landing page.
 */
export default function App() {
  const site = useSiteConfig()

  // No subdomain detected — show the platform landing page
  if (!site.subdomain) {
    return (
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout site={site} />}>
          <Route path="/" element={<SiteHomePage subdomain={site.subdomain} site={site} />} />
          {site.authEnabled && (
            <Route path="/login" element={<LoginPage site={site} />} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

/**
 * Routes to the correct home page component based on the subdomain.
 * Add new site entries here when onboarding gyms.
 */
function SiteHomePage({ subdomain, site }: { subdomain: string; site: ReturnType<typeof useSiteConfig> }) {
  switch (subdomain) {
    case 'onyx':
      return <OnyxHome site={site} />
    default:
      return <LandingPage />
  }
}
