'use client'

import { useEffect, useState } from 'react'
import {
  useSignInEmailPassword,
  useUserId
} from '@nhost/nextjs'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const userId = useUserId()
  const { signInEmailPassword, isSuccess, isLoading, isError, error } = useSignInEmailPassword()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    await signInEmailPassword(email, password)
  }

  // ✅ Redirect if signed in successfully
  useEffect(() => {
    if (userId || isSuccess) {
      router.push('/')
    }
  }, [userId, isSuccess, router])

  return (
    <main className="max-w-sm mx-auto p-4">
      <h1 className="text-xl mb-4">Sign In</h1>
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

        {isError && <p className="text-red-600">{error?.message}</p>}
      </form>

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
