import { Link } from 'react-router-dom'

interface AuthPageLayoutProps {
  children: React.ReactNode
}

export function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#111010]">
      <header className="border-b border-[#504A4A] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/rollops-logo.png" alt="RollOps" className="h-8 w-8" />
            <span className="text-xl font-bold text-[#EBFFEE]">
              Roll<span className="text-[#9B1421]">O</span>ps Pro
            </span>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </main>
    </div>
  )
}
