import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { PLATFORM } from '@/config/platform'
import { supabase } from '@/lib/supabase'
import type { CustomerProfile } from '@/lib/customerProfile'

interface DnsChecklist {
  customerNotified: boolean
  cnameAdded: boolean
  sslProvisioned: boolean
  dnsPropagated: boolean
  siteLive: boolean
}

const defaultChecklist: DnsChecklist = {
  customerNotified: false,
  cnameAdded: false,
  sslProvisioned: false,
  dnsPropagated: false,
  siteLive: false,
}

export function DnsSetupPage() {
  const { data: customers = [] } = useQuery<CustomerProfile[]>({
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
  const [checklists, setChecklists] = useState<Record<string, DnsChecklist>>({})

  function toggleItem(userId: string, key: keyof DnsChecklist) {
    setChecklists((prev) => ({
      ...prev,
      [userId]: {
        ...(prev[userId] ?? defaultChecklist),
        [key]: !(prev[userId]?.[key] ?? false),
      },
    }))
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">DNS Setup & Domain Routing</h2>

      {/* Instructions for Customers */}
      <div className="mb-8 rounded-xl border border-[#504A4A] bg-[#221F1F] p-6">
        <h3 className="mb-3 text-lg font-bold">Customer DNS Instructions</h3>
        <p className="mb-4 text-sm text-[#E0E0E0]">
          Send these instructions to customers who have their own domain name:
        </p>
        <div className="rounded-lg bg-[#111010] p-4 text-sm text-[#F5F5F5]">
          <p className="mb-2 font-semibold">To point your domain to your RollOps Pro site:</p>
          <ol className="mb-4 list-inside list-decimal space-y-1 text-[#E0E0E0]">
            <li>Log in to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)</li>
            <li>Navigate to DNS settings for your domain</li>
            <li>Add a <strong>CNAME record</strong>:
              <ul className="ml-6 mt-1 list-disc text-[#E0E0E0]">
                <li><strong>Name/Host:</strong> www (or @ for root domain)</li>
                <li><strong>Value/Points to:</strong> {PLATFORM.cnameTarget}</li>
                <li><strong>TTL:</strong> 3600 (or default)</li>
              </ul>
            </li>
            <li>Grant admin access to <strong>{PLATFORM.supportEmail}</strong> in your domain registrar so we can verify and troubleshoot if needed</li>
          </ol>
          <p className="text-xs text-[#E0E0E0]">
            DNS changes can take up to 48 hours to propagate. Contact {PLATFORM.supportEmail} if you need help.
          </p>
        </div>
      </div>

      {/* Per-Customer Checklists */}
      <h3 className="mb-4 text-lg font-bold">Customer DNS Checklists</h3>
      {customers.length === 0 ? (
        <div className="rounded-xl border border-[#504A4A] bg-[#221F1F] p-6 text-center">
          <p className="text-[#E0E0E0]">No customers to manage DNS for yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {customers.map((c) => {
            const cl = checklists[c.id] ?? defaultChecklist
            return (
              <div key={c.id} className="rounded-xl border border-[#504A4A] bg-[#221F1F] p-6">
                <h4 className="mb-4 text-base font-bold">{c.business_name} ({c.subdomain}.{PLATFORM.freeSubdomain})</h4>
                <div className="space-y-2">
                  <ChecklistItem label="Customer notified of DNS changes" checked={cl.customerNotified} onChange={() => toggleItem(c.id, 'customerNotified')} />
                  <ChecklistItem label="CNAME record added" checked={cl.cnameAdded} onChange={() => toggleItem(c.id, 'cnameAdded')} />
                  <ChecklistItem label="SSL certificate provisioned" checked={cl.sslProvisioned} onChange={() => toggleItem(c.id, 'sslProvisioned')} />
                  <ChecklistItem label="DNS propagation verified" checked={cl.dnsPropagated} onChange={() => toggleItem(c.id, 'dnsPropagated')} />
                  <ChecklistItem label="Site live on custom domain" checked={cl.siteLive} onChange={() => toggleItem(c.id, 'siteLive')} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ChecklistItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-[#111010]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-[#504A4A] accent-[#9B1421]"
      />
      <span className={`text-sm ${checked ? 'text-[#37ca37] line-through' : 'text-[#E0E0E0]'}`}>
        {label}
      </span>
    </label>
  )
}
