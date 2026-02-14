import { useQuery } from '@tanstack/react-query'

import { PLATFORM } from '@/config/platform'
import { supabase } from '@/lib/supabase'
import type { CustomerProfile } from '@/lib/customerProfile'

export function CustomersPage() {
  const { data: customers = [], isLoading } = useQuery<CustomerProfile[]>({
    queryKey: ['admin-customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_profiles')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as CustomerProfile[]
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#504A4A] border-t-[#9B1421]" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customers</h2>
        <span className="text-sm text-[#E0E0E0]">{customers.length} total</span>
      </div>

      {customers.length === 0 ? (
        <div className="rounded-xl border border-[#504A4A] bg-[#221F1F] p-8 text-center">
          <p className="mb-2 text-[#E0E0E0]">No customers yet.</p>
          <p className="text-sm text-[#E0E0E0]">
            Customer profiles are created in the <code className="rounded bg-[#504A4A] px-2 py-0.5 text-xs">customer_profiles</code> table.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#504A4A]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#504A4A] bg-[#221F1F]">
                <th className="px-4 py-3 font-semibold text-[#E0E0E0]">Site</th>
                <th className="px-4 py-3 font-semibold text-[#E0E0E0]">Subdomain</th>
                <th className="px-4 py-3 font-semibold text-[#E0E0E0]">Status</th>
                <th className="px-4 py-3 font-semibold text-[#E0E0E0]">Tier</th>
                <th className="px-4 py-3 font-semibold text-[#E0E0E0]">Initial Hours</th>
                <th className="px-4 py-3 font-semibold text-[#E0E0E0]">Monthly Hours</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-[#504A4A]/50 bg-[#111010]">
                  <td className="px-4 py-3 font-medium text-white">{c.business_name}</td>
                  <td className="px-4 py-3 text-[#E0E0E0]">{c.subdomain}.{PLATFORM.freeSubdomain}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        c.status === 'active'
                          ? 'bg-green-900/30 text-green-400'
                          : c.status === 'pending'
                            ? 'bg-yellow-900/30 text-yellow-400'
                            : 'bg-red-900/30 text-red-400'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#E0E0E0]">
                    <span className={`text-xs font-semibold ${c.tier === 'pro' ? 'text-[#9B1421]' : 'text-[#504A4A]'}`}>
                      {c.tier.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#E0E0E0]">{c.initial_hours_used} / {PLATFORM.initialHours}</td>
                  <td className="px-4 py-3 text-[#E0E0E0]">{c.monthly_hours_used} / {PLATFORM.monthlyHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
