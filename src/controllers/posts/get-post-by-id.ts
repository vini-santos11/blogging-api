import { Request, Response } from "express";
import { GetPostByIdService } from "../../services/posts/get-post-by-id-service";
import { Result } from "../../types/result";
import { postParamsSchema } from "../../utils/schemas";
import { errorHandler } from "../../utils/errorHandler";

export async function getPostById(request: Request, response: Response) {
    const { id } = postParamsSchema.parse(request.params);

    try {
        const getPostByIdService = new GetPostByIdService();
        const post = await getPostByIdService.execute(id);

        response.status(200).send(new Result(200, null, post));
    } catch (error) {
        errorHandler(error, response);
    }
}
