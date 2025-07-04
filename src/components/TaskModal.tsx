"use client";

/**
 * TaskModal Component
 * -----------------------------
 * A modal dialog for creating or editing a task.
 *
 * - Displays an input for the task title and description.
 * - Provides Save and Delete actions.
 * - Calls parent callbacks for persisting changes or deleting the task.
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Type definition for a single task.
type Task = {
  id: string;
  title: string;
  description?: string;
  position: number;
};

// Props that this component expects.
type Props = {
  task: Task | null; // If null, modal acts as "Add Task"
  onClose: () => void; // Called when modal should close
  onSave: (updated: { title: string; description?: string }) => void; // Save callback
  onDelete: (taskId: string) => void; // Delete callback
};

export default function TaskModal({ task, onClose, onSave, onDelete }: Props) {
  // Local state for title and description inputs
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  /**
   * Handle Save button click.
   * Calls onSave with updated data, then closes modal.
   */
  const handleSave = () => {
    onSave({ title, description });
    onClose();
  };

  /**
   * Handle Delete button click.
   * Calls onDelete if task exists, then closes modal.
   */
  const handleDelete = () => {
    if (task) {
      onDelete(task.id);
      onClose();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Task title input */}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />

          {/* Task description textarea */}
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          {/* Actions: Delete (if editing) and Save */}
          <div className="flex justify-end gap-2">
            {task && (
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
