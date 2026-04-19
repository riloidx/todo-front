"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchActiveTasks, fetchCompletedTasks } from "../../services/api.service";
import TaskRow from "./task-row";
import { TaskResponse } from "@/src/types/types";

interface TaskListProps {
  type: "active" | "completed";
}

export default function TaskList({ type }: TaskListProps) {
  const { data } = useSuspenseQuery<TaskResponse[]>({
    queryKey: ["tasks", type],
    queryFn: type === "active" ? fetchActiveTasks : fetchCompletedTasks,
  });

  return (
    <div className="flex flex-col gap-3">
      {data.map((t) => (
        <TaskRow key={t.id} task={t} />
      ))}

      {data.length === 0 && (
        <p className="text-center text-slate-400 py-4">
          {type === "active" ? "No active tasks" : "No completed tasks yet"}
        </p>
      )}
    </div>
  );
}