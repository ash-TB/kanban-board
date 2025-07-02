"use client";

import { useUpdateBoardMutation } from "@/graphql/generated";

export default function EditBoardButton({ boardId }: { boardId: string }) {
  const [updateBoard] = useUpdateBoardMutation();

  const handleClick = async () => {
    const newTitle = prompt("New board title?");
    if (newTitle) {
      await updateBoard({ variables: { id: boardId, title: newTitle } });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 underline"
    >
      Rename
    </button>
  );
}