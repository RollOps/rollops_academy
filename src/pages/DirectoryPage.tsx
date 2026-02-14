import { Link } from 'react-router-dom'

import { PLATFORM } from '@/config/platform'
import { GymDirectorySection } from '@/components/directory/GymDirectorySection'

export function DirectoryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111010] text-white">
      {/* Compact header */}
      <header className="sticky top-0 z-50 border-b border-[#504A4A] bg-[#111010]/95 backdrop-blur-md">
        <div className="mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src="/rollops-logo.png" alt="RollOps" className="h-7 w-7" />
            <span className="text-lg font-bold text-[#EBFFEE]">
              Roll<span className="text-[#9B1421]">O</span>ps Pro
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-white/50 sm:block">Find a Gym</span>
            <a
              href={`mailto:${PLATFORM.supportEmail}`}
              className="hidden text-sm font-medium text-[#E0E0E0] transition-colors hover:text-white sm:block"
            >
              Contact
            </a>
            <Link
              to="/login"
              className="rounded-lg bg-[#9B1421] px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#7A0F1A]"
            >
              Log In
            </Link>
          </div>
        </div>
      </header>

      {/* Map takes all available space */}
      <main className="flex-1 p-3">
        <GymDirectorySection />
      </main>
    </div>
  )
}
