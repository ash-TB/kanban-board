"use client";

import { useParams } from "next/navigation";
import { useGetBoardByIdQuery } from "@/graphql/generated";
import BoardDetail from "@/components/BoardDetail";

export default function BoardPage() {
  const { id } = useParams();
  const { data, loading, error, refetch } = useGetBoardByIdQuery({
    variables: { id: id! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const board = data?.boards_by_pk;
  if (!board) return <p>Board not found</p>;

  return <BoardDetail board={board} refetch={refetch} />; // ✅ pass refetch
}
