'use client';

import { useState } from 'react';
import { useUpdateTaskMutation } from '@/graphql/generated';

type Props = {
  taskId: string;
  currentTitle: string;
  currentDescription?: string | null;
};

export default function UpdateTaskForm({ taskId, currentTitle, currentDescription }: Props) {
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription ?? '');
  const [updateTask, { loading, error }] = useUpdateTaskMutation();

  const handleUpdate = async () => {
    if (!title.trim()) return;

    await updateTask({
      variables: {
        id: taskId,
        title: title.trim(),
        description: description.trim(),
      },
    });
  };

  return (
    <div className="flex space-x-2 mt-1">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="border px-1 py-0.5 text-sm"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="border px-1 py-0.5 text-sm"
      />
      <button
        onClick={handleUpdate}
        className="bg-yellow-500 text-white px-2 py-0.5 text-sm"
        disabled={loading}
      >
        Update
      </button>
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
}