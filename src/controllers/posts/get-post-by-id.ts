import { z } from "zod";
import { Request, Response } from "express";
import { GetPostByIdService } from "../../services/posts/get-post-by-id-service";
import { Result } from "../../types/result";

const paramsSchema = z.object({
    id: z.string({ required_error: "Id is required" }),
})

export async function getPostById(request: Request, response: Response) {
    const { id } = paramsSchema.parse(request.params);
    try {
        const getPostByIdService = new GetPostByIdService();
        const post = await getPostByIdService.execute(id);
        response.status(200).send(new Result(200, null, post));
    } catch (error) {
        response.status(400).send(new Result(400, String(error), null));
    }
}