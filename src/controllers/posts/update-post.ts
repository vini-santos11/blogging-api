import { Request, Response } from "express";
import { Result } from "../../types/result";
import { UpdatePostService } from "../../services/posts/update-post-service";
import { postBodySchema, postParamsSchema } from "../../utils/schemas";
import { errorHandler } from "../../utils/errorHandler";

export async function updatePost(request: Request, response: Response) {
    const { id } = postParamsSchema.parse(request.params);
    const { title, content } = postBodySchema.parse(request.body);

    try {
        const updateService = new UpdatePostService();
        await updateService.execute(id, { title, content });

        response.status(200).send(new Result(200, `Post '${id}' updated successfully`, null));
    } catch (error) {
        errorHandler(error, response)
    }
}
