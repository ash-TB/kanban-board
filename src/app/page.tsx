"use client";

import { useGetBoardsQuery } from '@/graphql/generated';

export default function HomePage() {
  const { data, loading, error } = useGetBoardsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Boards</h1>
      {data?.boards.length ? (
        <ul className="space-y-2">
          {data.boards.map((board) => (
            <li key={board.id} className="p-4 border rounded">{board.title}</li>
          ))}
        </ul>
      ) : (
        <p>No boards found</p>
      )}
    </div>
  );
}