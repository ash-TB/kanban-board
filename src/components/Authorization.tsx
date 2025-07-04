'use client'

/**
 * LoginPage Component
 * --------------------
 * Provides a simple sign-in form for users to authenticate
 * using Nhost email/password authentication.
 * 
 * - Uses Next.js App Router hooks for navigation
 * - Redirects to home if sign-in is successful or user is already signed in
 */

import { useEffect, useState } from 'react'
import {
  useSignInEmailPassword,
  useUserId
} from '@nhost/nextjs'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  // Next.js router for client-side navigation
  const router = useRouter()

  // Get currently signed-in user ID (null if not signed in)
  const userId = useUserId()

  // Nhost email/password sign-in hook
  const { signInEmailPassword, isSuccess, isLoading, isError, error } = useSignInEmailPassword()

  // Local form state for email and password inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /**
   * Handles form submission.
   * Calls Nhost's signInEmailPassword and prevents default form reload.
   */
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    await signInEmailPassword(email, password)
  }

  /**
   * Redirect user to homepage if already signed in
   * or if sign-in was successful.
   */
  useEffect(() => {
    if (userId || isSuccess) {
      router.push('/')
    }
  }, [userId, isSuccess, router])

  return (
    <main className="max-w-sm mx-auto p-4">
      <h1 className="text-xl mb-4">Sign In</h1>

      {/* Sign-in form */}
      <form onSubmit={handleSignIn} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        {/* Show error if sign-in fails */}
        {isError && <p className="text-red-600">{error?.message}</p>}
      </form>

      {/* Link to Sign Up page */}
      <p className="mt-4 text-center text-sm">
        Don’t have an account?{' '}
        <a
          href="/signup"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Sign Up
        </a>
      </p>
    </main>
  )
}
