"use client";

import { useInsertBoardMutation, GetBoardsDocument } from "@/graphql/generated";

export default function CreateBoardButton() {
  const [insertBoard] = useInsertBoardMutation();

  const handleClick = async () => {
    const title = prompt("Enter board title:");
    if (!title) return;

    await insertBoard({
      variables: { title },
      refetchQueries: [{ query: GetBoardsDocument }], // refresh the list
    });
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      + Create Board
    </button>
  );
}