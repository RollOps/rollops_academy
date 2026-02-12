import type { SiteConfig } from '@/config/sites'
import { LoginForm } from '@/components/auth/LoginForm'
import { AuthPageLayout } from '@/components/layout/AuthPageLayout'

interface LoginPageProps {
  site?: SiteConfig
}

export function LoginPage({ site }: LoginPageProps) {
  // Subdomain site login — themed to the site
  if (site?.subdomain) {
    return (
      <section
        className="flex min-h-[80vh] items-center justify-center px-6 py-16"
        style={{ backgroundColor: site.theme.background }}
      >
        <LoginForm site={site} />
      </section>
    )
  }

  // Platform login — RollOps Pro branded
  return (
    <AuthPageLayout>
      <LoginForm />
    </AuthPageLayout>
  )
}
