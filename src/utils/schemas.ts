import { z } from "zod";

export const postBodySchema = z.object({
    title: z.string({ required_error: "Title is required" }),
    content: z.string({ required_error: "Content is required" }),
    author: z.string({ required_error: "Author is required" })
})

export const postParamsSchema = z.object({
    id: z.string({ required_error: "Id is required" }),
})

export const searchPostQuerySchema = z.object({
    keyword: z.string({ required_error: "Keyword is required" }),
})


export const userBodySchema = z.object({
    username: z.string({ required_error: "Username is required" }),
    password: z.string({ required_error: "Password is required" })
})