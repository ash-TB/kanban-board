"use client";

/**
 * SignOutButton Component
 * -------------------------
 * A reusable button that signs the user out using Nhost auth,
 * then redirects them to the `/login` page.
 *
 * - Uses the Nhost client for authentication.
 * - Uses Next.js `useRouter` for client-side navigation.
 */

import { useRouter } from "next/navigation";
import { nhost } from "@/lib/nhost";

export default function SignOutButton() {
  const router = useRouter();

  /**
   * Signs out the current user and navigates to the login page.
   */
  const handleSignOut = async () => {
    await nhost.auth.signOut();
    router.push("/login"); // Redirect after sign out
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Sign Out
    </button>
  );
}
