import z from "zod";

export const CreateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  description: z
    .string()
    .trim()
    .max(500, { message: "Description must not exceed 500 characters" })
    .nullable()
    .optional()
    .or(z.literal("")),
});

export const UpdateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" })
    .optional()
    .nullable(),
  description: z
    .string()
    .trim()
    .max(500, { message: "Description must not exceed 500 characters" })
    .optional()
    .nullable(),
  completed: z.boolean().optional(),
  position: z.coerce
    .number()
    .min(0, { message: "Position cannot be negative" })
    .optional(),
});

export type CreateTaskType = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskType = z.infer<typeof UpdateTaskSchema>;
