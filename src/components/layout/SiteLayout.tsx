import { Outlet } from 'react-router-dom'

import type { SiteConfig } from '@/config/sites'
import { EditingToolbar } from '@/components/editing/EditingToolbar'
import { ApprovalBanner } from '@/components/editing/ApprovalBanner'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

interface SiteLayoutProps {
  site: SiteConfig
}

export function SiteLayout({ site }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: site.theme.background, color: site.theme.text }}>
      <EditingToolbar />
      <ApprovalBanner />
      <Navbar site={site} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer site={site} />
    </div>
  )
}
