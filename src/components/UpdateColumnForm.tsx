'use client';

import { useState } from 'react';
import { useUpdateColumnMutation } from '@/graphql/generated';

type Props = {
  columnId: string;
  currentTitle: string;
};

export default function UpdateColumnForm({ columnId, currentTitle }: Props) {
  const [title, setTitle] = useState(currentTitle);
  const [updateColumn, { loading, error }] = useUpdateColumnMutation();

  const handleUpdate = async () => {
    if (!title.trim()) return;

    await updateColumn({
      variables: { id: columnId, title: title.trim() },
    });
  };

  return (
    <div>
      <input
        className="border px-1 py-0.5 text-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="bg-yellow-500 text-white px-2 py-0.5 text-sm ml-1"
        onClick={handleUpdate}
        disabled={loading}
      >
        Update
      </button>
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
}