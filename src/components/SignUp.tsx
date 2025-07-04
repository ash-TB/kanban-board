'use client'

/**
 * SignUp Component
 * -----------------------------
 * A simple signup form that registers a new user
 * using Nhost's email/password authentication.
 *
 * - Uses Nhost's `useSignUpEmailPassword` hook for sign up.
 * - Shows success message and guides user to confirm email.
 * - Redirects user to the login page after signing up.
 */

import { useState } from 'react'
import { useSignUpEmailPassword } from '@nhost/nextjs'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()

  const { signUpEmailPassword, isLoading, isError, error } = useSignUpEmailPassword()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signedUp, setSignedUp] = useState(false)

  /**
   * Handles the sign up form submission.
   * Registers the user and shows confirmation instructions.
   */
  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    const result = await signUpEmailPassword(email, password)
    if (!result.error) {
      setSignedUp(true)
    }
  }

  // If sign up is successful, show confirmation instructions
  if (signedUp) {
    return (
      <div className="max-w-sm mx-auto p-4 space-y-4">
        <h2 className="text-lg font-semibold">Sign Up Successful!</h2>
        <p>
          Please check your email <strong>{email}</strong> to confirm your account before logging in.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Go to Login
        </button>
      </div>
    )
  }

  // Render the sign up form
  return (
    <form onSubmit={handleSignUp} className="max-w-sm mx-auto p-4 space-y-4">
      <h2 className="text-lg font-semibold">Sign Up</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white p-2 rounded disabled:opacity-50"
      >
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>

      {isError && <p className="text-red-600">{error?.message}</p>}

      <p className="text-sm">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 underline">
          Sign In
        </a>
      </p>
    </form>
  )
}
