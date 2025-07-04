"use client";

/**
 * BoardDetail Component
 * ---------------------
 * Renders the detailed Kanban board view with drag & drop support,
 * columns, tasks, and modals for creating/editing tasks and columns.
 * 
 * Tech: React, TypeScript, Apollo GraphQL, @hello-pangea/dnd.
 */

import React, { useState } from "react";
import Link from "next/link";
import TaskModal from "./TaskModal";
import ColumnModal from "./ColumnModal";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import {
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useAddColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
} from "@/graphql/generated";

/**
 * Task type definition.
 * Represents a single Kanban task/card.
 */
type Task = {
  id: string;
  title: string;
  description?: string;
  position: number;
  column_id?: string;
};

/**
 * Column type definition.
 * Represents a single Kanban column/list.
 */
type Column = {
  id: string;
  title: string;
  position: number;
  tasks: Task[];
};

/**
 * Board type definition.
 * Represents a full Kanban board containing multiple columns.
 */
type Board = {
  id: string;
  title: string;
  columns: Column[];
};

/**
 * Component props.
 * Accepts a board to render.
 */
type Props = {
  board: Board;
};

/**
 * BoardDetail
 * --------------------------
 * Main board view component.
 * Handles drag & drop reordering,
 * task/column CRUD actions,
 * and modal state.
 */
export default function BoardDetail({ board }: Props) {
  // Active task for editing or creating
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  // Column ID where new/edit task is created
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);

  // Active column for editing
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  // Column modal open state
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

  // Task CRUD mutations
  const [createTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  // Column CRUD mutations
  const [createColumn] = useAddColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const [deleteColumn] = useDeleteColumnMutation();

  /**
   * Get the next task position index in the given column.
   * Used to append new tasks at the end.
   */
  const getNextTaskPosition = (columnId: string) => {
    const column = board.columns.find((col) => col.id === columnId);
    return column ? column.tasks.length : 0;
  };

  /**
   * Handle drag & drop events for both columns and tasks.
   * Updates their position indexes in the backend.
   */
  async function handleDragEnd(result: DropResult) {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "COLUMN") {
      // Handle column reordering
      const cols = [...board.columns].sort((a, b) => a.position - b.position);
      const [moved] = cols.splice(source.index, 1);
      cols.splice(destination.index, 0, moved);

      // Update positions in backend
      for (let i = 0; i < cols.length; i++) {
        const col = cols[i];
        await updateColumn({
          variables: {
            id: col.id,
            title: col.title,
            position: i,
          },
        });
      }
    } else if (type === "TASK") {
      // Handle task moving within or across columns
      const sourceCol = board.columns.find(
        (col) => col.id === source.droppableId
      );
      const destCol = board.columns.find(
        (col) => col.id === destination.droppableId
      );
      if (!sourceCol || !destCol) return;

      if (sourceCol.id === destCol.id) {
        // Reorder tasks in same column
        const tasks = [...sourceCol.tasks].sort((a, b) => a.position - b.position);
        const [moved] = tasks.splice(source.index, 1);
        tasks.splice(destination.index, 0, moved);

        for (let i = 0; i < tasks.length; i++) {
          const task = tasks[i];
          await updateTask({
            variables: {
              id: task.id,
              title: task.title,
              description: task.description,
              position: i,
              column_id: sourceCol.id,
            },
          });
        }
      } else {
        // Move task to another column
        const sourceTasks = [...sourceCol.tasks].sort(
          (a, b) => a.position - b.position
        );
        const destTasks = [...destCol.tasks].sort(
          (a, b) => a.position - b.position
        );

        const [moved] = sourceTasks.splice(source.index, 1);
        const movedTask = { ...moved, column_id: destCol.id };

        destTasks.splice(destination.index, 0, movedTask);

        // Update positions in source column
        for (let i = 0; i < sourceTasks.length; i++) {
          const task = sourceTasks[i];
          await updateTask({
            variables: {
              id: task.id,
              title: task.title,
              description: task.description,
              position: i,
              column_id: sourceCol.id,
            },
          });
        }

        // Update positions in destination column
        for (let i = 0; i < destTasks.length; i++) {
          const task = destTasks[i];
          await updateTask({
            variables: {
              id: task.id,
              title: task.title,
              description: task.description,
              position: i,
              column_id: destCol.id,
            },
          });
        }
      }
    }
  }

  return (
    <div>
      {/* Back link */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-block bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm"
        >
          ← Back to Boards
        </Link>
      </div>

      {/* Board title */}
      <h1 className="text-2xl font-bold mb-4">{board.title}</h1>

      {/* Drag & Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              className="flex overflow-x-auto h-screen p-4 space-x-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {board.columns
                .slice()
                .sort((a, b) => a.position - b.position)
                .map((column, colIndex) => (
                  <Draggable
                    draggableId={column.id}
                    index={colIndex}
                    key={column.id}
                  >
                    {(provided) => (
                      <div
                        className="bg-gray-100 rounded-md w-[250px] flex flex-col flex-shrink-0"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        {/* Column header with title & edit */}
                        <div
                          className="p-4 border-b flex justify-between items-center cursor-move"
                          {...provided.dragHandleProps}
                        >
                          <h2 className="font-semibold">{column.title}</h2>
                          <button
                            onClick={() => {
                              setSelectedColumn(column);
                              setIsColumnModalOpen(true);
                            }}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                        </div>

                        {/* Tasks in column */}
                        <Droppable droppableId={column.id} type="TASK">
                          {(provided) => (
                            <div
                              className="flex-1 overflow-y-auto p-4 min-h-[200px]"
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {column.tasks
                                .slice()
                                .sort((a, b) => a.position - b.position)
                                .map((task, taskIndex) => (
                                  <Draggable
                                    key={task.id}
                                    draggableId={task.id}
                                    index={taskIndex}
                                  >
                                    {(provided) => (
                                      <div
                                        className="bg-white p-3 mb-2 rounded shadow-sm cursor-pointer hover:bg-gray-50"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() => {
                                          setSelectedTask(task);
                                          setSelectedColumnId(column.id);
                                        }}
                                      >
                                        <h3 className="font-medium">
                                          {task.title}
                                        </h3>
                                        {task.description && (
                                          <p className="text-sm text-gray-600">
                                            {task.description}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>

                        {/* Add task button */}
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
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}

              {/* Add new column button */}
              <div className="w-[250px] flex-shrink-0 bg-gray-50 p-4 rounded-md flex items-center justify-center">
                <button
                  onClick={() => {
                    setSelectedColumn(null);
                    setIsColumnModalOpen(true);
                  }}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100"
                >
                  + Add Column
                </button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Task modal for create/edit */}
      {selectedColumnId && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setSelectedTask(null);
            setSelectedColumnId(null);
          }}
          onSave={async ({ title, description }) => {
            if (selectedTask) {
              await updateTask({
                variables: {
                  id: selectedTask.id,
                  title,
                  description,
                  position: selectedTask.position,
                  column_id: selectedColumnId,
                },
              });
            } else {
              await createTask({
                variables: {
                  title,
                  column_id: selectedColumnId,
                  position: getNextTaskPosition(selectedColumnId),
                },
              });
            }
            setSelectedTask(null);
            setSelectedColumnId(null);
          }}
          onDelete={async (taskId) => {
            await deleteTask({ variables: { id: taskId } });
            setSelectedTask(null);
          }}
        />
      )}

      {/* Column modal for create/edit */}
      {isColumnModalOpen && (
        <ColumnModal
          column={selectedColumn}
          onClose={() => setIsColumnModalOpen(false)}
          onSave={async ({ title }) => {
            if (selectedColumn) {
              await updateColumn({
                variables: {
                  id: selectedColumn.id,
                  title,
                  position: selectedColumn.position,
                },
              });
            } else {
              await createColumn({
                variables: {
                  boardId: board.id,
                  title,
                  position: board.columns.length,
                },
              });
            }
            setIsColumnModalOpen(false);
            setSelectedColumn(null);
          }}
          onDelete={async (id) => {
            await deleteColumn({ variables: { id } });
            setIsColumnModalOpen(false);
            setSelectedColumn(null);
          }}
        />
      )}
    </div>
  );
}
