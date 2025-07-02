"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Column = {
  id: string;
  title: string;
  position: number;
};

type Props = {
  column: Column | null;
  onClose: () => void;
  onSave: (updated: { title: string }) => void;
  onDelete: (columnId: string) => void;
};

export default function ColumnModal({ column, onClose, onSave, onDelete }: Props) {
  const [title, setTitle] = useState(column?.title || "");

  const handleSave = () => {
    onSave({ title });
    onClose();
  };

  const handleDelete = () => {
    if (column) {
      onDelete(column.id);
      onClose();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{column ? "Edit Column" : "Add Column"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Column title"
          />
          <div className="flex justify-end gap-2">
            {column && (
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
