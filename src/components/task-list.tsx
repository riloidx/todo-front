import { FaRegTrashCan } from "react-icons/fa6";
import { Button } from "./button";
import { TaskResponse, UpdateTask } from "../types/types";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  deleteTask,
  fetchActiveTasks,
  updateTask,
} from "../services/api.service";

interface TaskProps {
  tasks: TaskResponse[];
}

export default function TaskList() {
  const { data } = useSuspenseQuery<TaskResponse[]>({
    queryKey: ["tasks", "active"],
    queryFn: fetchActiveTasks,
  });

  return <TaskTable tasks={data} />;
}

function TaskTable({ tasks }: TaskProps) {
  return (
    <div className="flex flex-col gap-3">
      {tasks.map((t) => (
        <TaskRow key={t.id} task={t} />
      ))}

      {tasks?.length === 0 && (
        <p className="text-center text-slate-400">No active tasks</p>
      )}
    </div>
  );
}

function TaskRow({ task }: { task: TaskResponse }) {
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
            className={`font-semibold text-slate-800 transition-all ${
              task.completed ? "line-through text-slate-400" : ""
            }`}
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

      <Button
        onClick={() => {
          deleteMutation.mutate();
        }}
        disabled={deleteMutation.isPending}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
      >
        <FaRegTrashCan size={18} />
      </Button>
    </div>
  );
}
