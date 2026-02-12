import type { SiteConfig } from '@/config/sites'
import { LoginForm } from '@/components/auth/LoginForm'

interface LoginPageProps {
  site: SiteConfig
}

export function LoginPage({ site }: LoginPageProps) {
  return (
    <section
      className="flex min-h-[80vh] items-center justify-center px-6 py-16"
      style={{ backgroundColor: site.theme.background }}
    >
      <LoginForm site={site} />
    </section>
  )
}
