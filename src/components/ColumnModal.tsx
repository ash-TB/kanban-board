"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

type Column = {
  id: string;
  title: string;
  position: number;
};

type Props = {
  column: Column | null;
  onClose: () => void;
  onSave: (data: { title: string }) => void;
  onDelete: (id: string) => void;
};

export default function ColumnModal({ column, onClose, onSave, onDelete }: Props) {
  const [title, setTitle] = useState(column?.title ?? "");

  useEffect(() => {
    setTitle(column?.title ?? "");
  }, [column]);

  const isEditMode = column !== null;

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    onSave({ title: title.trim() });
    onClose();
  };

  const handleDelete = () => {
    if (!column) return;
    onDelete(column.id);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Column" : "Add Column"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Column title"
            autoFocus
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