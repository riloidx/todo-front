"use client";

import { updateTask } from "@/src/services/api.service";
import { TaskResponse } from "@/src/types/types";
import {
  UpdateTaskSchema,
  UpdateTaskType,
} from "@/src/utils/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "../button";
import Input from "../input";

interface UpdateTaskFormProps {
  task: TaskResponse;
  onSuccess: () => void;
}

export default function UpdateTaskForm({
  task,
  onSuccess,
}: UpdateTaskFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTaskType>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(UpdateTaskSchema) as any,
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateTaskType) => updateTask(task.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onSuccess();
    },
  });

  const onSubmit = (data: UpdateTaskType) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 ml-1">
            Task Title
          </label>
          <Input
            {...register("title")}
            placeholder="Edit title..."
            error={errors.title?.message}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 ml-1">
            Description
          </label>
          <Input
            {...register("description")}
            placeholder="Edit description..."
            error={errors.description?.message}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
        <Button
          type="button"
          onClick={onSuccess}
          className="bg-transparent hover:bg-slate-100 text-slate-600 border-none shadow-none"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="px-8 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {mutation.isPending ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
