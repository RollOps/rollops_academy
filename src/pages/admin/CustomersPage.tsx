import { customerMappings } from '@/config/customers'
import { PLATFORM } from '@/config/platform'

export function CustomersPage() {
  const customers = Object.values(customerMappings)

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
            Add customer mappings in <code className="rounded bg-[#504A4A] px-2 py-0.5 text-xs">src/config/customers.ts</code>
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
                <th className="px-4 py-3 font-semibold text-[#E0E0E0]">Initial Hours</th>
                <th className="px-4 py-3 font-semibold text-[#E0E0E0]">Monthly Hours</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.userId} className="border-b border-[#504A4A]/50 bg-[#111010]">
                  <td className="px-4 py-3 font-medium text-white">{c.siteName}</td>
                  <td className="px-4 py-3 text-[#E0E0E0]">{c.subdomain}.{PLATFORM.domain}</td>
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
                  <td className="px-4 py-3 text-[#E0E0E0]">{c.initialHoursUsed} / {PLATFORM.initialHours}</td>
                  <td className="px-4 py-3 text-[#E0E0E0]">{c.monthlyHoursUsed} / {PLATFORM.monthlyHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
