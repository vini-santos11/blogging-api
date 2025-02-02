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

export const eventBodySchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    description: z.string({ required_error: "Description is required" }),
    startDate: z.string({ required_error: "Start date is required" }).datetime(),
    endDate: z.string({ required_error: "End date is required" }).datetime(),
})

export const eventParamsSchema = z.object({
    id: z.string({ required_error: "Id is required" }),
})