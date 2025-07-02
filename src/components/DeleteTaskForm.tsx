'use client';

import { useDeleteTaskMutation } from '@/graphql/generated';

type Props = {
  taskId: string;
};

export default function DeleteTaskForm({ taskId }: Props) {
  const [deleteTask, { loading, error }] = useDeleteTaskMutation();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask({ variables: { id: taskId } });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-2 py-0.5 text-sm"
      disabled={loading}
    >
      Delete
    </button>
  );
}