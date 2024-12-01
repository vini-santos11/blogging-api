import { Request, Response } from "express";

import { Result } from './../../types/result';
import { CreatePostService } from "../../services/posts/create-post-service";
import { postBodySchema } from "../../utils/schemas";
import { errorHandler } from "../../utils/errorHandler";

export async function createPost(request: Request, response: Response) {
    try {
        const { title, content, author } = postBodySchema.parse(request.body);

        const createPostService = new CreatePostService();
        const post = await createPostService.execute({ title, content, author });

        response.status(201).send(new Result(201, `Post '${title}' created successfully`, post));
    } catch (error) {
        errorHandler(error, response);
    }
}
