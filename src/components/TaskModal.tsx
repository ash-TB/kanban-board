"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

type Task = {
  id: string;
  title: string;
  description?: string;
};

type Props = {
  task: Task | null;            // allow null for create mode
  onClose: () => void;
  onSave: (updated: { title: string; description?: string }) => void;
  onDelete: (taskId: string) => void;
};

export default function TaskModal({ task, onClose, onSave, onDelete }: Props) {
  // Initialize state from task or empty for create mode
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");

  // Reset form when task changes (important for modal reuse)
  useEffect(() => {
    setTitle(task?.title ?? "");
    setDescription(task?.description ?? "");
  }, [task]);

  const isEditMode = task !== null;

  const handleSave = () => {
    if (title.trim() === "") {
      alert("Title is required");
      return;
    }
    onSave({ title: title.trim(), description: description.trim() || undefined });
    onClose();
  };

  const handleDelete = () => {
    if (!task) return;
    onDelete(task.id);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Task" : "Add Task"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            autoFocus
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
          />

          <div className="flex justify-end gap-2">
            {isEditMode && (
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button onClick={handleSave}>
              {isEditMode ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
