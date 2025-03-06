import { create } from "zustand";

export const useStore = create((set) => ({
    columns: [
      { id: "todo", title: "To Do", tasks: [] },
      { id: "inprogress", title: "In Progress", tasks: [] },
      { id: "done", title: "Done", tasks: [] },
    ],
    addColumn: (title) =>
      set((state) => ({
        columns: [...state.columns, { id: crypto.randomUUID(), title, tasks: [] }],
      })),
    addTask: (columnId, task) =>
      set((state) => ({
        columns: state.columns.map((col) =>
          col.id === columnId ? { ...col, tasks: [...col.tasks, { id: crypto.randomUUID(), text: task }] } : col
        ),
      })),
    moveTask: (taskId, toCol) =>
      set((state) => {
        let task;
        const newColumns = state.columns.map((col) => {
          if (col.tasks.find((t) => t.id === taskId)) {
            task = col.tasks.find((t) => t.id === taskId);
            return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
          }
          return col;
        });
        if (!task) return state;
        return {
          columns: newColumns.map((col) =>
            col.id === toCol ? { ...col, tasks: [...col.tasks, task] } : col
          ),
        };
      }),
  }));