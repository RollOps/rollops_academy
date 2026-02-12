import { useAuth } from '@/providers/AuthProvider'
import { PLATFORM } from '@/config/platform'

export function GetStartedPage() {
  const { user, signOut } = useAuth()

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

      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Welcome */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Get Your Business Online with{' '}
            <span className="text-[#9B1421]">RollOps Pro</span>
          </h1>
          <p className="text-lg text-[#E0E0E0]">
            We build, host, and manage professional websites so you can focus on running your business.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="mb-12 rounded-2xl border border-[#504A4A] bg-[#221F1F] p-8">
          <div className="mb-6 text-center">
            <span className="text-5xl font-bold">${PLATFORM.priceMonthly}</span>
            <span className="text-lg text-[#E0E0E0]">/month</span>
          </div>
          <ul className="mb-8 space-y-3">
            <IncludedItem text="Professional web hosting with SSL" />
            <IncludedItem text={`Free subdomain: yoursite.${PLATFORM.freeSubdomain}`} />
            <IncludedItem text={`Up to ${PLATFORM.initialHours} hours to convert your existing website`} />
            <IncludedItem text={`${PLATFORM.monthlyHours} hours of updates included every month`} />
            <IncludedItem text="Self-service portal — update photos, blog, hours, and logo" />
            <IncludedItem text="Login for your customers via their RollOps account" />
            <IncludedItem text="We handle DNS setup and domain routing" />
          </ul>
          <p className="mb-2 text-xs text-[#E0E0E0]">
            * Custom domains are not included in the ${PLATFORM.priceMonthly}/mo plan.
            Domain registration is handled through{' '}
            <a
              href="https://www.name.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9B1421] hover:underline"
            >
              {PLATFORM.domainRegistrar}
            </a>
            {' '}and priced separately.
          </p>
        </div>

        {/* CTA — Book Consultation */}
        <div className="rounded-2xl border border-[#504A4A] bg-[#221F1F] p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Ready to Get Started?</h2>
          <p className="mb-6 text-[#E0E0E0]">
            Book a free consultation and we'll walk through your current site,
            discuss your needs, and get you set up.
          </p>

          {/* Primary CTA — will be replaced with embedded calendar */}
          <a
            href={`mailto:${PLATFORM.supportEmail}?subject=Web%20Hosting%20Consultation&body=Hi%20RollOps%20team,%0A%0AI'd%20like%20to%20learn%20more%20about%20web%20hosting%20for%20my%20business.%0A%0ABusiness%20name:%20%0ACurrent%20website:%20%0A%0AThanks!`}
            className="inline-block rounded-lg bg-[#9B1421] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7A0F1A]"
          >
            Book a Consultation
          </a>
          <p className="mt-3 text-xs text-[#E0E0E0]">
            Or email us directly at{' '}
            <a href={`mailto:${PLATFORM.supportEmail}`} className="text-[#9B1421] hover:underline">
              {PLATFORM.supportEmail}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

function IncludedItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#37ca37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <span className="text-sm text-[#F5F5F5]">{text}</span>
    </li>
  )
}
