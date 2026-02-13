import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useSiteConfig } from '@/hooks/useSiteConfig'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { GetStartedPage } from '@/pages/GetStartedPage'
import { CustomerDashboard } from '@/pages/dashboard/CustomerDashboard'
import { HoursPage } from '@/pages/dashboard/HoursPage'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { OnyxHome } from '@/sites/onyx-bjj/pages/OnyxHome'

/**
 * Root application component.
 *
 * Routing by JWT role:
 * - platform_admin (is_admin/is_developer) → /admin
 * - hosting_customer (has a mapped site)   → /dashboard
 * - owner (no hosted site yet)             → /get-started (sales/consultation)
 * - authenticated (any valid login)        → /get-started
 */
export default function App() {
  const site = useSiteConfig()

  // No subdomain — platform pages
  if (!site.subdomain) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/get-started" element={
            <ProtectedRoute>
              <GetStartedPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['hosting_customer', 'platform_admin']}>
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/hours" element={
            <ProtectedRoute allowedRoles={['hosting_customer', 'platform_admin']}>
              <HoursPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['platform_admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    )
  }

  // Subdomain detected — customer site
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

function SiteHomePage({ subdomain, site }: { subdomain: string; site: ReturnType<typeof useSiteConfig> }) {
  switch (subdomain) {
    case 'onyxbjj':
      return <OnyxHome site={site} />
    default:
      return <LandingPage />
  }
}
