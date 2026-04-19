import { deleteTask, updateTask } from "@/src/services/api.service";
import { TaskResponse, UpdateTask } from "@/src/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button } from "../button";
import Modal from "../modal";
import UpdateTaskForm from "./update-task-form";

export default function TaskRow({ task }: { task: TaskResponse }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateTask) => updateTask(task.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(task.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) =>
            updateMutation.mutate({ completed: e.target.checked })
          }
          disabled={updateMutation.isPending}
          className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
        />

        <div className="flex flex-col">
          <span
            className={`font-semibold text-slate-800 transition-all ${task.completed ? "text-slate-400" : ""}`}
          >
            {task.title}
          </span>
          {task.description && (
            <span className="text-sm text-slate-500 line-clamp-1">
              {task.description}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        {!task.completed && (
          <Button
            onClick={() => setIsEditOpen(true)}
            className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
          >
            <FaEdit size={18} />
          </Button>
        )}

        {task.completed && (
          <span className="text-[10px] uppercase tracking-wider font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            Completed: {format(new Date(task.updatedAt), "d MMM, HH:mm")}
          </span>
        )}

        <Button
          onClick={() => {
            if (confirm("Удалить?")) deleteMutation.mutate();
          }}
          disabled={deleteMutation.isPending}
          className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
        >
          <FaRegTrashCan size={18} />
        </Button>
      </div>

      {!task.completed && (
        <Modal
          title="Edit Task"
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        >
          <UpdateTaskForm task={task} onSuccess={() => setIsEditOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
