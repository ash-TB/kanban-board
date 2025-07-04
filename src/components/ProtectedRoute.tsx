'use client'

import { useAuthenticationStatus } from '@nhost/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuthenticationStatus()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) return <p>Loading auth...</p>
  if (!isAuthenticated) return null

  return <>{children}</>
}
