'use client';

import { useState } from 'react';
import { useAddColumnMutation } from '@/graphql/generated';

type Props = {
  boardId: string;
  nextPosition: number;
};

export default function AddColumnForm({ boardId, nextPosition }: Props) {
  const [title, setTitle] = useState('');
  const [addColumn, { loading, error }] = useAddColumnMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

await addColumn({
  variables: {
    boardId,
    title: title.trim(),
    position: nextPosition,
  },
  refetchQueries: ['GetBoardById'], // Replace with your board query operation name
});

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        className="border px-2 py-1 rounded mr-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New column title"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
        disabled={loading}
      >
        Add Column
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </form>
  );
}
