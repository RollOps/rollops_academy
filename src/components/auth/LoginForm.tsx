import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { supabase } from '@/lib/supabase'
import { getPlatformRole } from '@/lib/roles'
import type { SiteConfig } from '@/config/sites'

interface LoginFormProps {
  site?: SiteConfig
}

export function LoginForm({ site }: LoginFormProps) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const colors = site?.theme ?? {
    surface: '#221F1F',
    text: '#FFFFFF',
    textMuted: '#E0E0E0',
    accent: '#9B1421',
    border: '#504A4A',
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.')
        } else if (authError.message.includes('Email not confirmed')) {
          setError('Please check your email and confirm your account.')
        } else {
          setError(authError.message)
        }
        return
      }

      if (data.user && data.session) {
        const role = getPlatformRole(data.session, data.user.id)
        switch (role) {
          case 'platform_admin':
            navigate('/admin', { replace: true })
            break
          case 'hosting_customer':
            navigate('/dashboard', { replace: true })
            break
          case 'owner':
          case 'authenticated':
          default:
            navigate('/get-started', { replace: true })
            break
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="mx-auto w-full max-w-md rounded-2xl p-8 shadow-2xl"
      style={{ backgroundColor: colors.surface }}
    >
      {!site && (
        <div className="mb-6 flex justify-center">
          <img src="/rollops-logo.png" alt="RollOps" className="h-16 w-16" />
        </div>
      )}

      <h2 className="mb-2 text-center text-2xl font-bold" style={{ color: colors.text }}>
        {site ? 'Member Login' : 'Welcome Back'}
      </h2>
      <p className="mb-6 text-center text-sm" style={{ color: colors.textMuted }}>
        {site
          ? `Sign in to access your ${site.name} account`
          : 'Sign in to your RollOps Pro account'}
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-900/30 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium" style={{ color: colors.textMuted }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-current"
            style={{ color: colors.text, backgroundColor: '#504A4A', borderColor: '#504A4A' }}
            placeholder="you@example.com"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" style={{ color: colors.textMuted }}>
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 pr-12 text-sm outline-none transition-colors focus:border-current"
              style={{ color: colors.text, backgroundColor: '#504A4A', borderColor: '#504A4A' }}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              style={{ color: colors.textMuted }}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: colors.accent }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="mt-6 text-center text-xs" style={{ color: colors.textMuted }}>
        Powered by{' '}
        <a href="https://rollops.pro" className="hover:underline" style={{ color: colors.accent }}>
          RollOps Pro
        </a>
      </p>
    </div>
  )
}
