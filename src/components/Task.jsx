"use client";
import { useDraggable } from "@dnd-kit/core";

export function Task({ task }) {
    const { attributes, listeners, setNodeRef } = useDraggable({ id: task.id });
    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="p-2 bg-gray-700 text-white rounded cursor-grab"
      >
        {task.text}
      </div>
    );
  }