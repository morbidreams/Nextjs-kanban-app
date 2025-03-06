"use client";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Task } from "./Task";

export function Column({ column, addTask }) {
    const { setNodeRef } = useDroppable({ id: column.id });
    const [adding, setAdding] = useState(false);
    const [taskText, setTaskText] = useState("");
    
    return (
      <div ref={setNodeRef} className="p-4 bg-gray-800 text-white rounded shadow w-64">
        <h2 className="text-lg font-bold mb-2">{column.title}</h2>
        <div className="space-y-2">
          {column.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
        {adding ? (
          <input
            className="p-2 mt-2 border rounded w-full bg-gray-900 text-white"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && taskText.trim()) {
                addTask(column.id, taskText);
                setTaskText("");
                setAdding(false);
              }
            }}
            autoFocus
          />
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="mt-2 w-full p-4 bg-gray-600/50 hover:bg-gray-700 text-white rounded flex justify-center items-center text-2xl backdrop-blur-md"
          >
            +
          </button>
        )}
      </div>
    );
  }