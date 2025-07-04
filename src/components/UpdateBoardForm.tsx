"use client";

/**
 * EditBoardButton Component
 * --------------------------------------
 * A simple button that prompts the user
 * to update the title of an existing board.
 *
 * - Uses a prompt dialog for the new title.
 * - Calls an update mutation on confirm.
 */

import { useUpdateBoardMutation } from "@/graphql/generated";

// Props for this component: expects a board ID.
export default function EditBoardButton({ boardId }: { boardId: string }) {
  // GraphQL mutation hook to update a board.
  const [updateBoard] = useUpdateBoardMutation();

  /**
   * Handle click event.
   * Prompts user for a new title and calls the update mutation.
   */
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
