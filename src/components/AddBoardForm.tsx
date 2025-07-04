"use client";

/**
 * CreateBoardButton Component
 * ----------------------------
 * Renders a button that allows the user to create a new board.
 * 
 * - Prompts the user for a board title.
 * - Calls the `insertBoard` GraphQL mutation.
 * - Refetches the boards list to update the UI.
 */

import { useInsertBoardMutation, GetBoardsDocument } from "@/graphql/generated";

export default function CreateBoardButton() {
  // Initialize the insertBoard mutation hook.
  const [insertBoard] = useInsertBoardMutation();

  /**
   * Handles the Create Board button click.
   * Prompts the user for a board title and executes the mutation.
   */
  const handleClick = async () => {
    const title = prompt("Enter board title:");
    if (!title) return;

    await insertBoard({
      variables: { title },
      // Ensure the boards list is refetched after creation.
      refetchQueries: [{ query: GetBoardsDocument }],
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
