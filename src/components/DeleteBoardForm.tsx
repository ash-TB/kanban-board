"use client";

/**
 * DeleteBoardButton Component
 * ----------------------------
 * Renders a button that allows the user to delete a board.
 *
 * - Displays a confirmation dialog.
 * - Calls the `deleteBoard` GraphQL mutation if confirmed.
 * - Expects a `boardId` prop.
 */

import { useDeleteBoardMutation } from "@/graphql/generated";

export default function DeleteBoardButton({ boardId }: { boardId: string }) {
  // Initialize the deleteBoard mutation hook.
  const [deleteBoard] = useDeleteBoardMutation();

  /**
   * Handles the Delete button click.
   * Confirms with the user and deletes the board.
   */
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
