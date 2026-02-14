import { useAuth } from '@/providers/AuthProvider'
import { useCustomerSite } from '@/hooks/useCustomerSite'
import { PLATFORM } from '@/config/platform'

export function HoursPage() {
  const { user, signOut } = useAuth()
  const { customer } = useCustomerSite()

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

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 flex items-center gap-4">
          <a href="/dashboard" className="text-sm text-[#9B1421] hover:underline">&larr; Dashboard</a>
          <h1 className="text-3xl font-bold">Billable Hours</h1>
        </div>

        {customer ? (
          <div className="space-y-8">
            {/* Initial Conversion */}
            <div className="rounded-xl border border-[#504A4A] bg-[#221F1F] p-6">
              <h2 className="mb-2 text-lg font-bold">Initial Site Conversion</h2>
              <p className="mb-4 text-sm text-[#E0E0E0]">
                Up to {PLATFORM.initialHours} hours included to convert and adapt your existing website.
              </p>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#E0E0E0]">Hours Used</span>
                <span className="font-semibold text-white">{customer.initial_hours_used} / {PLATFORM.initialHours}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-[#504A4A]">
                <div
                  className="h-full rounded-full bg-[#9B1421] transition-all"
                  style={{ width: `${Math.min((customer.initial_hours_used / PLATFORM.initialHours) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Monthly Updates */}
            <div className="rounded-xl border border-[#504A4A] bg-[#221F1F] p-6">
              <h2 className="mb-2 text-lg font-bold">Monthly Updates</h2>
              <p className="mb-4 text-sm text-[#E0E0E0]">
                {PLATFORM.monthlyHours} hours included this month for site updates and changes.
              </p>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#E0E0E0]">Hours Used</span>
                <span className="font-semibold text-white">{customer.monthly_hours_used} / {PLATFORM.monthlyHours}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-[#504A4A]">
                <div
                  className="h-full rounded-full bg-[#37ca37] transition-all"
                  style={{ width: `${Math.min((customer.monthly_hours_used / PLATFORM.monthlyHours) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#504A4A] bg-[#221F1F] p-6 text-center">
              <p className="mb-2 text-sm text-[#E0E0E0]">Need additional hours?</p>
              <a
                href={`mailto:${PLATFORM.supportEmail}?subject=Additional%20Hours%20Request`}
                className="text-sm font-semibold text-[#9B1421] hover:underline"
              >
                Contact {PLATFORM.supportEmail}
              </a>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-[#504A4A] bg-[#221F1F] p-8 text-center">
            <p className="text-[#E0E0E0]">No site assigned yet. Hours tracking will appear once your site is set up.</p>
          </div>
        )}
      </div>
    </div>
  )
}
