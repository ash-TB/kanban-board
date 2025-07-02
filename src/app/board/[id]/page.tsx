"use client";

import { useParams } from "next/navigation";
import { useBoardByIdSubscription } from "@/graphql/generated"; // make sure this import is used
import BoardDetail from "@/components/BoardDetail";

export default function BoardPage() {
  const { id } = useParams();

  // Use the subscription hook here instead of query hook
  const { data, loading, error } = useBoardByIdSubscription({
    variables: { id: id! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const board = data?.boards_by_pk;
  if (!board) return <p>Board not found</p>;

  return <BoardDetail board={board} />;
}
