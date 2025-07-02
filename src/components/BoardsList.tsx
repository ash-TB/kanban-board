'use client';

import React from 'react';
import { useGetBoardsQuery } from '@/graphql/generated';
import Link from 'next/link';
import DeleteBoardButton from './DeleteBoardForm'; // ✅ Make sure you have this!

export default function BoardsList() {
  const { data, loading, error } = useGetBoardsQuery();

  if (loading) return <p>Loading boards...</p>;
  if (error) return <p>Error loading boards: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.boards.map(board => (
        <div
          key={board.id}
          className="p-4 bg-white rounded shadow hover:shadow-md flex flex-col justify-between"
        >
          <Link href={`/board/${board.id}`} className="text-lg font-semibold mb-2 hover:underline">
            {board.title}
          </Link>

          <DeleteBoardButton boardId={board.id} />
        </div>
      ))}
    </div>
  );
}