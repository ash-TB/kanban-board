"use client";

import { useDeleteBoardMutation } from "@/graphql/generated";

export default function DeleteBoardButton({ boardId }: { boardId: string }) {
  const [deleteBoard] = useDeleteBoardMutation();

  const handleClick = async () => {
    if (confirm("Are you sure you want to delete this board?")) {
      await deleteBoard({ variables: { id: boardId } });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-red-600 underline"
    >
      Delete
    </button>
  );
}