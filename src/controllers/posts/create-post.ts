import { Request, Response } from "express";
import { Result } from './../../types/result';
import { CreatePostService } from "../../services/posts/create-post-service";
import { postBodySchema } from "../../utils/schemas";

export async function createPost(request: Request, response: Response) {
    const { title, content } = postBodySchema.parse(request.body);

    try {
        const createPostService = new CreatePostService();
        const post = await createPostService.execute({ title, content });

        response.status(201).send(new Result(201, `Post '${title}' created successfully`, post));
    } catch (error) {
        response.status(400).send(new Result(400, String(error), null));
    }
}
