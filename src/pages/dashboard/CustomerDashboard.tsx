import { Link } from 'react-router-dom'

import { useAuth } from '@/providers/AuthProvider'
import { useCustomerSite } from '@/hooks/useCustomerSite'
import { PLATFORM } from '@/config/platform'

export function CustomerDashboard() {
  const { user, signOut } = useAuth()
  const customer = useCustomerSite()

  return (
    <div className="min-h-screen bg-[#111010] text-white">
      {/* Top Bar */}
      <header className="border-b border-[#504A4A] bg-[#221F1F] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/rollops-logo.png" alt="RollOps" className="h-8 w-8" />
            <span className="text-lg font-bold text-[#EBFFEE]">
              Roll<span className="text-[#9B1421]">O</span>ps Pro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-[#E0E0E0] sm:block">{user?.email}</span>
            <button
              onClick={signOut}
              className="rounded-lg border border-[#504A4A] px-4 py-2 text-sm text-[#E0E0E0] transition-colors hover:border-white hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

        {customer ? (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Site Preview Card */}
            <div className="rounded-xl border border-[#504A4A] bg-[#221F1F] p-6">
              <h2 className="mb-2 text-lg font-bold">Your Site</h2>
              <p className="mb-1 text-sm text-[#E0E0E0]">{customer.siteName}</p>
              <div className="mb-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    customer.status === 'active'
                      ? 'bg-green-900/30 text-green-400'
                      : customer.status === 'pending'
                        ? 'bg-yellow-900/30 text-yellow-400'
                        : 'bg-red-900/30 text-red-400'
                  }`}
                >
                  {customer.status === 'active' ? 'Live' : customer.status === 'pending' ? 'Pending Approval' : 'Suspended'}
                </span>
              </div>
              <div className="flex gap-3">
                <a
                  href={`/?site=${customer.subdomain}`}
                  className="rounded-lg bg-[#9B1421] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#7A0F1A]"
                >
                  View Site
                </a>
                <a
                  href={`/?site=${customer.subdomain}&edit=true`}
                  className="rounded-lg border border-[#504A4A] px-4 py-2 text-sm font-semibold text-[#E0E0E0] transition-colors hover:border-white hover:text-white"
                >
                  Edit Site
                </a>
              </div>
            </div>

            {/* Hours Summary */}
            <div className="rounded-xl border border-[#504A4A] bg-[#221F1F] p-6">
              <h2 className="mb-4 text-lg font-bold">Billable Hours</h2>
              <div className="space-y-4">
                <HoursBar
                  label="Initial Conversion"
                  used={customer.initialHoursUsed}
                  total={PLATFORM.initialHours}
                />
                <HoursBar
                  label="Monthly Updates"
                  used={customer.monthlyHoursUsed}
                  total={PLATFORM.monthlyHours}
                />
              </div>
              <Link
                to="/dashboard/hours"
                className="mt-4 inline-block text-sm text-[#9B1421] hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-[#504A4A] bg-[#221F1F] p-8 text-center">
            <p className="mb-4 text-[#E0E0E0]">
              Your site is being set up. We'll notify you when it's ready for review.
            </p>
            <a
              href={`mailto:${PLATFORM.supportEmail}`}
              className="text-sm text-[#9B1421] hover:underline"
            >
              Contact {PLATFORM.supportEmail}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

function HoursBar({ label, used, total }: { label: string; used: number; total: number }) {
  const pct = Math.min((used / total) * 100, 100)
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-[#E0E0E0]">{label}</span>
        <span className="text-[#E0E0E0]">{used} / {total} hrs</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#504A4A]">
        <div
          className="h-full rounded-full bg-[#9B1421] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
