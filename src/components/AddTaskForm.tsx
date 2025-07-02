"use client";

import { useState } from "react";
import { useAddTaskMutation } from "@/graphql/generated";

export default function AddTaskForm({ columnId, nextPosition }: { columnId: string, nextPosition: number }) {
  const [title, setTitle] = useState("");
  const [addTask] = useAddTaskMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTask({ variables: { title, column_id: columnId, position: nextPosition } });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New task title"
        className="border p-1 rounded text-sm"
      />
      <button type="submit" className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
        Add
      </button>
    </form>
  );
}