import { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { CustomersPage } from './CustomersPage'
import { DnsSetupPage } from './DnsSetupPage'

type Tab = 'customers' | 'dns'

export function AdminDashboard() {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('customers')

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
            <span className="rounded bg-[#9B1421] px-2 py-0.5 text-xs font-semibold">ADMIN</span>
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

      {/* Tabs */}
      <div className="border-b border-[#504A4A]">
        <div className="mx-auto flex max-w-7xl gap-0 px-6">
          <TabButton label="Customers" active={activeTab === 'customers'} onClick={() => setActiveTab('customers')} />
          <TabButton label="DNS Setup" active={activeTab === 'dns'} onClick={() => setActiveTab('dns')} />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {activeTab === 'customers' && <CustomersPage />}
        {activeTab === 'dns' && <DnsSetupPage />}
      </div>
    </div>
  )
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`border-b-2 px-6 py-3 text-sm font-semibold transition-colors ${
        active
          ? 'border-[#9B1421] text-white'
          : 'border-transparent text-[#E0E0E0] hover:text-white'
      }`}
    >
      {label}
    </button>
  )
}
