'use client';

/**
 * BoardsList Component
 * --------------------
 * Displays a grid of all available Kanban boards.
 * Uses Apollo GraphQL to fetch boards from Nhost backend.
 * 
 * Includes delete functionality for each board.
 */

import React from 'react';
import { useGetBoardsQuery } from '@/graphql/generated';
import Link from 'next/link';
import DeleteBoardButton from './DeleteBoardForm'; // Handles board deletion

/**
 * BoardsList
 * --------------------------
 * Fetches boards and renders them in a responsive grid.
 * Shows loading and error states.
 */
export default function BoardsList() {
  // Query all boards using auto-generated GraphQL hook
  const { data, loading, error } = useGetBoardsQuery();

  // Show loading state while fetching boards
  if (loading) return <p>Loading boards...</p>;

  // Show error state if query fails
  if (error) return <p>Error loading boards: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-4">
      {data?.boards.map(board => (
        <div
          key={board.id}
          className="min-w-[200px] max-w-[300px] p-4 bg-white rounded shadow hover:shadow-md flex flex-col justify-between"
        >
          {/* Board link */}
          <Link
            href={`/board/${board.id}`}
            className="text-lg font-semibold mb-2 hover:underline"
          >
            {board.title}
          </Link>

          {/* Delete button */}
          <DeleteBoardButton boardId={board.id} />
        </div>
      ))}
    </div>
  );
}
