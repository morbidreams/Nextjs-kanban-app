"use client";
import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { useStore } from "@/store";
import { Column } from "./Column";

export default function Board() {
  const { columns, addColumn, addTask, moveTask } = useStore();
  const [addingColumn, setAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  
  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={(event) => {
      const { active, over } = event;
      if (over) {
        moveTask(active.id, over.id);
      }
    }}>
      <div className="flex gap-4 p-4 overflow-x-auto bg-gray-900 text-white min-h-screen">
        {columns.map((column) => (
          <Column key={column.id} column={column} addTask={addTask} />
        ))}
        <div className="p-4 bg-gray-800 rounded-xl flex flex-col justify-center items-center">
          {addingColumn ? (
            <input
              className="p-2 border rounded w-full bg-gray-900 text-white"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newColumnTitle.trim()) {
                  addColumn(newColumnTitle);
                  setNewColumnTitle("");
                  setAddingColumn(false);
                }
              }}
              autoFocus
            />
          ) : (
            <button
              onClick={() => setAddingColumn(true)}
              className="text-3xl text-white hover:text-gray-400"
            >
              +
            </button>
          )}
        </div>
      </div>
    </DndContext>
  );
}
