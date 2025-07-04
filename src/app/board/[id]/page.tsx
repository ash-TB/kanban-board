"use client";

import { useParams } from "next/navigation";
import { useBoardByIdSubscription } from "@/graphql/generated"; // Your generated subscription hook
import BoardDetail from "@/components/BoardDetail";

export default function BoardPage() {
  const { id } = useParams();

  const { data, loading, error } = useBoardByIdSubscription({
    variables: { id: id! },
  });

  if (loading) return <p>Loading board...</p>;
  if (error) return <p>Error loading board: {error.message}</p>;

  const board = data?.boards_by_pk;
  if (!board) return <p>Board not found</p>;

  return <BoardDetail board={board} />;
}
