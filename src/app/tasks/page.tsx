"use client";

import { Button } from "@/src/components/button";
import CreateTaskForm from "@/src/components/task/create-task-form";
import Modal from "@/src/components/modal";
import TaskList from "@/src/components/task/task-list";
import TaskSkeleton from "@/src/components/task/task-skeleton";
import { Suspense, useState } from "react";

export default function TaskHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-12">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Active Tasks</h1>
            <Button onClick={() => setIsModalOpen(true)}>Create Task</Button>
          </div>
          <Suspense fallback={<TaskSkeleton />}>
            <TaskList type="active" />
          </Suspense>
        </div>

        <div className="opacity-80">
          <h2 className="text-xl font-bold text-slate-700 mb-6">Completed</h2>
          <Suspense fallback={<TaskSkeleton />}>
            <TaskList type="completed" />
          </Suspense>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Task">
          <CreateTaskForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
}