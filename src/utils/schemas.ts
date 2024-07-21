import { z } from "zod";

export const postBodySchema = z.object({
    title: z.string({ required_error: "Title is required" }),
    content: z.string({ required_error: "Content is required" }),
})

export const postParamsSchema = z.object({
    id: z.string({ required_error: "Id is required" }),
})