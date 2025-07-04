'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import BoardsList from '@/components/BoardsList'
import CreateBoardButton from '@/components/AddBoardForm'
import SignOutButton from '@/components/SignOut'

export default function HomePage() {
  return (
    <ProtectedRoute>
      <main className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Boards</h1>
        <SignOutButton/>
        <CreateBoardButton />

        <div className="mt-8">
          <BoardsList />
        </div>
      </main>
    </ProtectedRoute>
  )
}

