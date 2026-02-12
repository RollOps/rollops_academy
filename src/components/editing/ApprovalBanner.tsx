import { useAuth } from '@/providers/AuthProvider'
import { useSiteConfig } from '@/hooks/useSiteConfig'
import { customerMappings } from '@/config/customers'
import { PLATFORM } from '@/config/platform'

export function ApprovalBanner() {
  const { user, isAuthenticated } = useAuth()
  const site = useSiteConfig()

  if (!isAuthenticated || !user || !site.subdomain) return null

  const mapping = customerMappings[user.id]
  if (!mapping || mapping.subdomain !== site.subdomain || mapping.status !== 'pending') return null

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-yellow-600/30 bg-yellow-900/20 px-4 py-3">
      <span className="text-sm font-medium text-yellow-300">
        Your site is ready for review. Take a look and let us know!
      </span>
      <div className="flex items-center gap-3">
        <a
          href={`mailto:${PLATFORM.supportEmail}?subject=Site%20Changes%20Request&body=I'd%20like%20to%20request%20changes%20to%20my%20site.`}
          className="rounded border border-yellow-600/50 px-3 py-1 text-xs font-semibold text-yellow-300 transition-colors hover:border-yellow-400 hover:text-yellow-200"
        >
          Request Changes
        </a>
        <button
          onClick={() => alert('Site approval will be managed by your RollOps Pro admin.')}
          className="rounded bg-green-700 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-green-600"
        >
          Approve & Go Live
        </button>
      </div>
    </div>
  )
}
