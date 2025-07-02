"use client";

import React, { useState } from "react";
import AddColumnForm from "./AddColumnForm";
import UpdateColumnForm from "./UpdateColumnForm";
import DeleteColumnForm from "./DeleteColumnForm";
import TaskModal from "./TaskModal";

import {
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "@/graphql/generated";

type Task = {
  id: string;
  title: string;
  description?: string;
  position: number;
};
type Column = {
  id: string;
  title: string;
  position: number;
  tasks: Task[];
};
type Board = {
  id: string;
  title: string;
  columns: Column[];
};
type Props = { board: Board };

export default function BoardDetail({ board }: Props) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);

  const [createTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const getNextPosition = (columnId: string) => {
    const column = board.columns.find((col) => col.id === columnId);
    if (!column) return 0;
    return column.tasks.length;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{board.title}</h1>

      <div className="flex overflow-x-auto h-screen p-4 space-x-4">
        {board.columns
          .slice()
          .sort((a, b) => a.position - b.position)
          .map((column) => (
            <div
              key={column.id}
              className="bg-gray-100 rounded-md w-[250px] flex flex-col flex-shrink-0"
            >
              {/* Column Header */}
              <div className="p-4 border-b">
                <h2 className="font-semibold">{column.title}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <UpdateColumnForm
                    columnId={column.id}
                    currentTitle={column.title}
                  />
                  <DeleteColumnForm columnId={column.id} />
                </div>
              </div>

              {/* Task List */}
              <div className="flex-1 overflow-y-auto p-4">
                {column.tasks
                  .slice()
                  .sort((a, b) => a.position - b.position)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-white p-3 mb-2 rounded shadow-sm cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setSelectedTask(task);
                        setSelectedColumnId(column.id);
                      }}
                    >
                      <h3 className="font-medium">{task.title}</h3>
                      {task.description && (
                        <p className="text-sm text-gray-600">{task.description}</p>
                      )}
                    </div>
                  ))}
              </div>

              {/* Add Task Button */}
              <div className="p-4 border-t">
                <button
                  onClick={() => {
                    setSelectedTask(null);
                    setSelectedColumnId(column.id);
                  }}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100"
                >
                  + Add Task
                </button>
              </div>
            </div>
          ))}

        {/* Add Column */}
        <div className="w-[250px] flex-shrink-0 bg-gray-50 p-4 rounded-md flex items-center justify-center">
          <AddColumnForm boardId={board.id} nextPosition={board.columns.length} />
        </div>
      </div>

      {/* Task Modal */}
      {selectedColumnId && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setSelectedTask(null);
            setSelectedColumnId(null);
          }}
          onSave={async ({ title, description }) => {
            if (selectedTask) {
              // Update existing task
              await updateTask({
                variables: {
                  id: selectedTask.id,
                  title,
                  description,
                },
              });
            } else {
              // Create new task
              await createTask({
                variables: {
                  title,
                  column_id: selectedColumnId,
                  position: getNextPosition(selectedColumnId),
                },
              });
            }
            setSelectedTask(null);
            setSelectedColumnId(null);
          }}
          onDelete={async (taskId) => {
            await deleteTask({ variables: { id: taskId } });
            setSelectedTask(null);
            setSelectedColumnId(null);
          }}
        />
      )}
    </div>
  );
}
