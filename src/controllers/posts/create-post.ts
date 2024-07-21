import { Result } from './../../types/result';
import { z } from "zod";
import { Request, Response } from "express";
import { CreatePostService } from "../../services/posts/create-post-service";

const bodySchema = z.object({
    title: z.string({ required_error: "Title is required" }),
    content: z.string({ required_error: "Content is required" }),
})

export async function createPost(request: Request, response: Response) {
    const { title, content } = bodySchema.parse(request.body);
    try {
        const createPostService = new CreatePostService();
        const post = await createPostService.execute({ title, content });
        response.status(201).send(new Result(201, null, post));
    } catch (error) {
        response.status(400).send(new Result(400, String(error), null));
    }
} 