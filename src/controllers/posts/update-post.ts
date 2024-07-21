import { z } from "zod";
import { Request, Response } from "express";
import { Result } from "../../types/result";
import { UpdatePostService } from "../../services/posts/update-post-service";

const bodySchema = z.object({
    title: z.string({ required_error: "Title is required" }),
    content: z.string({ required_error: "Content is required" }),
})

const paramsSchema = z.object({
    id: z.string({ required_error: "Id is required" }),
})

export async function updatePost(request: Request, response: Response) {
    const { id } = paramsSchema.parse(request.params);
    const { title, content } = bodySchema.parse(request.body);

    try {
        const updateService = new UpdatePostService();
        await updateService.execute(id, { title, content });
        response.status(200).send(new Result(200, `Post '${id}' updated successfully`, null));
    } catch (error) {
        if (error === "Post not found") {
            return response.status(404).send(new Result(404, 'Post not found', null));
        }

        if (error.code === "22P02") {
            return response.status(400).send(new Result(404, 'Invalid syntax for uuid', null));
        }

        response.status(500).send(new Result(500, 'Internal Server Error', null));
    }
}
