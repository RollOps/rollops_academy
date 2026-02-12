import { Navigate } from 'react-router-dom'

import { useAuth } from '@/providers/AuthProvider'
import { usePlatformRole } from '@/hooks/usePlatformRole'
import type { PlatformRole } from '@/lib/roles'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: PlatformRole[]
}

/**
 * Redirects unauthenticated users to /login.
 * If allowedRoles is set, redirects users without a matching role
 * to their appropriate default page.
 */
export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth()
  const role = usePlatformRole()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111010]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#504A4A] border-t-[#9B1421]" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to={defaultRouteForRole(role)} replace />
  }

  return <>{children}</>
}

function defaultRouteForRole(role: PlatformRole): string {
  switch (role) {
    case 'platform_admin': return '/admin'
    case 'hosting_customer': return '/dashboard'
    case 'owner': return '/get-started'
    case 'authenticated': return '/get-started'
  }
}
