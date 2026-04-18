"use client";

import { Button } from "@/src/components/button";
import CreateTaskForm from "@/src/components/create-task-form";
import Input from "@/src/components/input";
import Modal from "@/src/components/modal";
import TaskList from "@/src/components/task-list";
import TaskSkeleton from "@/src/components/task-skeleton";
import { Suspense, useState } from "react";

export default function TaskHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Tasks</h1>
          <Button onClick={() => setIsModalOpen(true)}>Create Task</Button>
        </header>

        <Suspense fallback={<TaskSkeleton />}>
          <TaskList />
        </Suspense>

        <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Task">
          <CreateTaskForm onSuccess={closeModal} />
        </Modal>
      </div>
    </div>
  );
}
