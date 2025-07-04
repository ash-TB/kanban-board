/**
 * BoardPage.tsx
 * --------------------------------------------------
 * Renders the detail view for a single board.
 *
 * - Uses the board ID from the URL params.
 * - Subscribes to board updates in realtime via GraphQL subscription.
 * - Shows loading and error states.
 * - If the board exists, renders the <BoardDetail> component.
 */

"use client";

import { useParams } from "next/navigation";
import { useBoardByIdSubscription } from "@/graphql/generated";
import BoardDetail from "@/components/BoardDetail";

export default function BoardPage() {
  // Get the board ID from the URL params
  const { id } = useParams();

  // Subscribe to the board by ID using a GraphQL subscription
  const { data, loading, error } = useBoardByIdSubscription({
    variables: { id: id! },
  });

  // Handle loading state
  if (loading) return <p>Loading board...</p>;

  // Handle error state
  if (error) return <p>Error loading board: {error.message}</p>;

  // If no board is found, show fallback
  const board = data?.boards_by_pk;
  if (!board) return <p>Board not found</p>;

  // Render the board details
  return <BoardDetail board={board} />;
}
