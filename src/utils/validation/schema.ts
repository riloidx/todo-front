import z from "zod";

export const createTaskSchema = z.object({
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

export const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" })
    .optional()
    .or(z.null()),
  description: z
    .string()
    .trim()
    .max(500, { message: "Description must not exceed 500 characters" })
    .nullable()
    .optional()
    .or(z.literal("")),
  completed: z.boolean().optional(),
  position: z.coerce
    .number()
    .min(0, { message: "Position cannot be negative" })
    .optional(),
});