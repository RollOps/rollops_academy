import { useState, type FormEvent } from 'react'

import type { SiteConfig } from '@/config/sites'

interface LoginFormProps {
  site: SiteConfig
}

/**
 * Login form component.
 *
 * TODO: Integrate with RollOps Authentication (Supabase Auth).
 * The goal is to use the same auth system as the main RollOps platform
 * so gym members can log in with their existing RollOps accounts.
 *
 * Considerations for CTO discussion:
 * - Cookie domain: may need to be under rollops.pro for shared auth
 * - Supabase auth cookies need to be accessible across subdomains
 * - Alternative: use rollops.pro subdomains instead of rollops.academy
 */
export function LoginForm({ site }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: Integrate with RollOps auth
    console.log('Login attempt:', { email, site: site.subdomain })
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl p-8 shadow-2xl" style={{ backgroundColor: site.theme.surface }}>
      <h2 className="mb-2 text-center text-2xl font-bold" style={{ color: site.theme.text }}>
        Member Login
      </h2>
      <p className="mb-6 text-center text-sm" style={{ color: site.theme.textMuted }}>
        Sign in to access your {site.name} account
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium" style={{ color: site.theme.textMuted }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-current"
            style={{ color: site.theme.text, borderColor: `${site.theme.accent}44` }}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" style={{ color: site.theme.textMuted }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-current"
            style={{ color: site.theme.text, borderColor: `${site.theme.accent}44` }}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg px-4 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: site.theme.accent, color: '#ffffff' }}
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-xs" style={{ color: site.theme.textMuted }}>
        Powered by{' '}
        <a href="https://rollops.pro" className="hover:underline" style={{ color: site.theme.accent }}>
          RollOps Authentication
        </a>
      </p>
    </div>
  )
}
