import { Request, Response } from "express";

import { Result } from "../../types/result";
import { GetAllPostsAdminService } from "../../services/posts/get-all-posts-admin-service";
import { errorHandler } from "../../utils/errorHandler";

export async function getAllPostsAdmin(request: Request, response: Response) {
    try {
        const getAllPostsAdminService = new GetAllPostsAdminService();
        const posts = await getAllPostsAdminService.execute();

        response.status(200).send(new Result(200, "Success", posts));
    } catch (error) {
        errorHandler(error, response);
    }
}
