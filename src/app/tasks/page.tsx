"use client"; // 1. Обязательно

import TaskRow from "@/src/components/task-row";
import { fetchActiveTasks } from "@/src/services/api.service";
import { TaskResponse } from "@/src/types/types";
import { useQuery } from "@tanstack/react-query";

export default function TaskHome() {
  const { data, isLoading, error } = useQuery<TaskResponse[]>({
    queryKey: ["tasks", "active"],
    queryFn: fetchActiveTasks,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Tasks</h1>
        </header>

        <div className="flex flex-col gap-3">
          {data?.map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}

          {data?.length === 0 && (
            <p className="text-center text-slate-400">No active tasks</p>
          )}
        </div>
      </div>
    </div>
  );
}
