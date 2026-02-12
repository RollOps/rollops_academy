import { Link } from 'react-router-dom'

import { PLATFORM } from '@/config/platform'

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111010] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#504A4A] bg-[#111010]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/rollops-logo.png" alt="RollOps" className="h-8 w-8" />
            <span className="text-xl font-bold text-[#EBFFEE]">
              Roll<span className="text-[#9B1421]">O</span>ps Pro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${PLATFORM.supportEmail}`}
              className="hidden text-sm font-medium text-[#E0E0E0] transition-colors hover:text-white sm:block"
            >
              Contact
            </a>
            <Link
              to="/login"
              className="rounded-lg bg-[#9B1421] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#7A0F1A]"
            >
              Log In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center md:py-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            Professional Web Hosting
            <br />
            <span className="text-[#9B1421]">For Your Business</span>
          </h1>
          <p className="mb-8 text-lg text-[#E0E0E0] md:text-xl">
            We build, host, and manage your website so you can focus on what matters —
            running your business.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#pricing"
              className="rounded-lg bg-[#9B1421] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7A0F1A]"
            >
              Get Started — ${PLATFORM.priceMonthly}/mo
            </a>
            <a
              href="#how-it-works"
              className="rounded-lg border-2 border-[#504A4A] px-8 py-3 text-sm font-semibold text-[#E0E0E0] transition-colors hover:border-white hover:text-white"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="border-t border-[#504A4A] px-6 py-24" style={{ backgroundColor: '#221F1F' }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-white">
            Everything You Need
          </h2>
          <p className="mb-12 text-center text-[#E0E0E0]">
            One simple plan. No hidden fees.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              title="Professional Hosting"
              description="Fast, secure, and reliable hosting on modern infrastructure. Your site is always online."
              icon={
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                </svg>
              }
            />
            <FeatureCard
              title="Site Conversion"
              description={`Up to ${PLATFORM.initialHours} billable hours to convert and adapt your existing website to work with the RollOps Pro platform.`}
              icon={
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.76-3.35a.75.75 0 010-1.3l5.76-3.35a.75.75 0 011.08.67v6.66a.75.75 0 01-1.08.67z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.72 15.17l-5.76-3.35a.75.75 0 010-1.3l5.76-3.35a.75.75 0 011.08.67v6.66a.75.75 0 01-1.08.67z" />
                </svg>
              }
            />
            <FeatureCard
              title="Monthly Updates"
              description={`${PLATFORM.monthlyHours} hours of billable updates included every month. Keep your site fresh without the hassle.`}
              icon={
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
            <FeatureCard
              title="Self-Service Portal"
              description="Log in with your RollOps account to update photos, blog posts, hours, and your logo — anytime."
              icon={
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-[#504A4A] px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              step={1}
              title="Contact Us"
              description={`Reach out to ${PLATFORM.supportEmail} and tell us about your business and existing website.`}
            />
            <StepCard
              step={2}
              title="We Build It"
              description="Our team converts your site to the RollOps Pro platform with your branding, content, and features."
            />
            <StepCard
              step={3}
              title="You Approve & Go Live"
              description="Review your new site, request any changes, and go live. We handle domain setup and ongoing hosting."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-[#504A4A] px-6 py-24" style={{ backgroundColor: '#221F1F' }}>
        <div className="mx-auto max-w-lg">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Simple Pricing
          </h2>
          <div className="rounded-2xl border border-[#504A4A] bg-[#111010] p-8">
            <div className="mb-6 text-center">
              <span className="text-5xl font-bold text-white">${PLATFORM.priceMonthly}</span>
              <span className="text-lg text-[#E0E0E0]">/month</span>
            </div>
            <ul className="mb-8 space-y-3">
              <PricingItem text="Professional web hosting & SSL" />
              <PricingItem text={`Up to ${PLATFORM.initialHours} hours for initial site conversion`} />
              <PricingItem text={`${PLATFORM.monthlyHours} hours of updates included monthly`} />
              <PricingItem text="Self-service portal (photos, blog, hours, logo)" />
              <PricingItem text="RollOps account login for your customers" />
              <PricingItem text={`Free subdomain: yoursite.${PLATFORM.freeSubdomain}`} />
              <PricingItem text="Ongoing support via email" />
            </ul>
            <a
              href={`mailto:${PLATFORM.supportEmail}?subject=Web%20Hosting%20Inquiry`}
              className="block w-full rounded-lg bg-[#9B1421] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#7A0F1A]"
            >
              Get Started
            </a>
            <div className="mt-4 space-y-1 text-center text-xs text-[#E0E0E0]">
              <p>Additional hours billed separately. No long-term contracts.</p>
              <p>
                Custom domains are not included in the ${PLATFORM.priceMonthly}/mo plan.
                We use{' '}
                <a
                  href="https://www.name.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9B1421] hover:underline"
                >
                  {PLATFORM.domainRegistrar}
                </a>
                {' '}for domain registration — pricing varies by domain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#504A4A] px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-[#E0E0E0]">
            Contact us today and we'll have your site up and running in no time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${PLATFORM.supportEmail}?subject=Web%20Hosting%20Inquiry`}
              className="rounded-lg bg-[#9B1421] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7A0F1A]"
            >
              Email {PLATFORM.supportEmail}
            </a>
            <Link
              to="/login"
              className="rounded-lg border-2 border-[#504A4A] px-8 py-3 text-sm font-semibold text-[#E0E0E0] transition-colors hover:border-white hover:text-white"
            >
              Customer Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#504A4A] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <img src="/rollops-logo.png" alt="RollOps" className="h-6 w-6" />
            <span className="text-sm font-semibold text-[#EBFFEE]">
              Roll<span className="text-[#9B1421]">O</span>ps Pro
            </span>
          </div>
          <p className="text-xs text-[#E0E0E0]">
            &copy; {new Date().getFullYear()} RollOps. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#504A4A] bg-[#111010] p-6">
      <div className="mb-4 text-[#9B1421]">{icon}</div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-[#E0E0E0]">{description}</p>
    </div>
  )
}

function StepCard({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9B1421] text-lg font-bold text-white">
        {step}
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-[#E0E0E0]">{description}</p>
    </div>
  )
}

function PricingItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#37ca37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <span className="text-sm text-[#F5F5F5]">{text}</span>
    </li>
  )
}
