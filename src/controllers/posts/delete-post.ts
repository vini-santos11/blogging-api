import { z } from "zod";
import { Request, Response } from "express";
import { Result } from "../../types/result";
import { DeletePostService } from "../../services/posts/delete-post-service";

const paramsSchema = z.object({
    id: z.string({ required_error: "Id is required" }),
})

export async function deletePost(request: Request, response: Response) {
    const { id } = paramsSchema.parse(request.params);

    try {
        const deleteService = new DeletePostService();
        await deleteService.execute(id);
        response.status(200).send(new Result(200, `Post '${id}' deleted successfully`, null));
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
