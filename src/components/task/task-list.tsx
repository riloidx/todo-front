"use client";

import { TaskResponse } from "@/src/types/types";
import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  fetchActiveTasks,
  fetchCompletedTasks,
  updatePositionTask,
} from "../../services/api.service";
import SortableTaskRow from "./sortableTableRow";

interface TaskListProps {
  type: "active" | "completed";
}

export default function TaskList({ type }: TaskListProps) {
  const { data } = useSuspenseQuery<TaskResponse[]>({
    queryKey: ["tasks", type],
    queryFn: type === "active" ? fetchActiveTasks : fetchCompletedTasks,
  });

  const queryClient = useQueryClient();

  const updatePositionMutation = useMutation({
    mutationFn: ({ id, position }: { id: number | string; position: number }) =>
      updatePositionTask(Number(id), { position }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", type] });
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { source } = event.operation;

    if (isSortable(source)) {
      if (event.canceled || source.initialIndex === source.index) {
        return;
      }

      const newPosition = source.index + 1;

      updatePositionMutation.mutate({
        id: source.id,
        position: newPosition,
      });
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-3">
        {data.map((t, index) => (
          <SortableTaskRow key={t.id} task={t} index={index} />
        ))}

        {data.length === 0 && (
          <p className="text-center text-slate-400 py-4">
            {type === "active" ? "No active tasks" : "No completed tasks yet"}
          </p>
        )}
      </div>
    </DragDropProvider>
  );
}
