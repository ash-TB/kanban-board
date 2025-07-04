"use client";

/**
 * ColumnModal Component
 * ---------------------
 * This modal is used for creating a new column or editing/deleting an existing column.
 * 
 * Props:
 * - column: the column being edited (or null if creating a new one)
 * - onClose: callback to close the modal
 * - onSave: callback to save column changes
 * - onDelete: callback to delete the column
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Column type definition
type Column = {
  id: string;
  title: string;
  position: number;
};

// Props for ColumnModal component
type Props = {
  column: Column | null;
  onClose: () => void;
  onSave: (updated: { title: string }) => void;
  onDelete: (columnId: string) => void;
};

/**
 * ColumnModal
 * --------------------------
 * Handles editing, saving, and deleting a Kanban column.
 */
export default function ColumnModal({
  column,
  onClose,
  onSave,
  onDelete,
}: Props) {
  // Local state for the column title input
  const [title, setTitle] = useState(column?.title || "");

  /**
   * Handle save action
   * Calls onSave with new title and closes the modal.
   */
  const handleSave = () => {
    onSave({ title });
    onClose();
  };

  /**
   * Handle delete action
   * Calls onDelete with column ID if editing an existing column.
   */
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
          {/* Column title input */}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Column title"
          />

          <div className="flex justify-end gap-2">
            {/* Show delete button if editing */}
            {column && (
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
            {/* Save button */}
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
