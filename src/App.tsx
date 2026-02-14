import { type ComponentType } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useSiteConfig } from '@/hooks/useSiteConfig'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { GetStartedPage } from '@/pages/GetStartedPage'
import { CustomerDashboard } from '@/pages/dashboard/CustomerDashboard'
import { HoursPage } from '@/pages/dashboard/HoursPage'
import { MediaPage } from '@/pages/dashboard/MediaPage'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { DirectoryPage } from '@/pages/DirectoryPage'
import { OnyxHome } from '@/sites/onyx-bjj/pages/OnyxHome'
import { DefaultTemplate } from '@/sites/default/DefaultTemplate'
import type { SiteConfig } from '@/config/sites'

/**
 * Root application component.
 *
 * Routing by JWT role:
 * - platform_admin (is_admin/is_developer via admins table) → /admin
 * - hosting_customer (has customer_profiles entry)           → /dashboard
 * - owner (no hosted site yet)                               → /get-started
 * - authenticated (any valid login)                          → /get-started
 */
export default function App() {
  const { site, isLoading } = useSiteConfig()

  // Show loading spinner while fetching DB-driven site config
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111010]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#504A4A] border-t-[#9B1421]" />
      </div>
    )
  }

  // No subdomain — platform pages
  if (!site.subdomain) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
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
          <Route path="/dashboard/media" element={
            <ProtectedRoute allowedRoles={['hosting_customer', 'platform_admin']}>
              <MediaPage />
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
          <Route path="/" element={<SiteHomePage site={site} />} />
          {site.authEnabled && (
            <Route path="/login" element={<LoginPage site={site} />} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

/** Registry of custom-built site components keyed by customComponent value */
const CUSTOM_SITES: Record<string, ComponentType<{ site: SiteConfig }>> = {
  onyxbjj: OnyxHome,
}

function SiteHomePage({ site }: { site: SiteConfig }) {
  const CustomComponent = site.customComponent
    ? CUSTOM_SITES[site.customComponent]
    : undefined

  if (CustomComponent) {
    return <CustomComponent site={site} />
  }

  return <DefaultTemplate site={site} />
}
