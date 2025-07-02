'use client';

import { useDeleteColumnMutation } from '@/graphql/generated';

type Props = {
  columnId: string;
};

export default function DeleteColumnForm({ columnId }: Props) {
  const [deleteColumn, { loading, error }] = useDeleteColumnMutation();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this column?')) {
      await deleteColumn({ variables: { id: columnId } });
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