import { Request, Response } from "express";

import { Result } from "../../types/result";
import { DeletePostService } from "../../services/posts/delete-post-service";
import { postParamsSchema } from "../../utils/schemas";
import { errorHandler } from "../../utils/errorHandler";

export async function deletePost(request: Request, response: Response) {
    try {
        const { id } = postParamsSchema.parse(request.params);

        const deleteService = new DeletePostService();
        await deleteService.execute(id);

        response.status(200).send(new Result(200, `Post '${id}' deleted successfully`, null));
    } catch (error) {
        errorHandler(error, response)
    }
}
