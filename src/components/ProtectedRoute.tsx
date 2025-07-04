'use client'

/**
 * ProtectedRoute Component
 * -------------------------
 * A higher-order component that wraps child content and ensures
 * the user is authenticated before rendering it.
 *
 * - Redirects unauthenticated users to `/login`.
 * - Displays a loading message while checking auth status.
 *
 * Props:
 * - children: React nodes that should be protected.
 */

import { useAuthenticationStatus } from '@nhost/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // Get auth status and loading state from Nhost.
  const { isLoading, isAuthenticated } = useAuthenticationStatus()

  const router = useRouter()

  /**
   * Effect hook:
   * If the user is not authenticated once loading finishes,
   * redirect them to the login page.
   */
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, router])

  // Show a simple loading state while checking auth.
  if (isLoading) return <p>Loading auth...</p>

  // Prevent rendering protected content if not authenticated.
  if (!isAuthenticated) return null

  // Render children once authenticated.
  return <>{children}</>
}
