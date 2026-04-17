import { FaRegTrashCan } from "react-icons/fa6";
import { Button } from "./button";
import { TaskResponse } from "../types/types";

interface TaskProps {
  task: TaskResponse;
}

export default function TaskRow({ task }: TaskProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        <div className="flex flex-col">
          <span
            className={`font-semibold text-slate-800 ${task.completed ? "line-through text-slate-400" : ""}`}
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
      <Button className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
        <FaRegTrashCan size={18} />
      </Button>
    </div>
  );
}
