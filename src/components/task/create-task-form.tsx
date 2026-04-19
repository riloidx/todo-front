"use client";

import { createTask } from "@/src/services/api.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  CreateTaskSchema,
  CreateTaskType,
} from "../../utils/validation/schema";
import { Button } from "../button";
import Input from "../input";

export default function CreateTaskForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskType>({
    resolver: zodResolver(CreateTaskSchema),
  });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset();
      onSuccess();
    },
  });

  const onSubmit = (data: CreateTaskType) => {
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
            placeholder="e.g. Feed dog"
            error={errors.title?.message}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 ml-1">
            Description (optional)
          </label>
          <Input
            {...register("description")}
            placeholder="Add some details..."
            error={errors.description?.message}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
        <Button
          type="button"
          onClick={onSuccess}
          className="bg-indigo-950 hover:bg-indigo-600 text-slate-600 border-none shadow-none"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.isPending} className="px-8">
          {mutation.isPending ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating...
            </span>
          ) : (
            "Create Task"
          )}
        </Button>
      </div>
    </form>
  );
}
