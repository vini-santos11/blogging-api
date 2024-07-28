import { Request, Response } from "express";

import { Result } from "../../types/result";
import { GetAllPostsSearchService } from "../../services/posts/get-all-posts-search-service";
import { errorHandler } from "../../utils/errorHandler";
import { searchPostQuerySchema } from "../../utils/schemas";

export async function getAllPostsSearch(request: Request, response: Response) {
    try {
        const { keyword } = searchPostQuerySchema.parse(request.query);

        const getAllPostsSearchService = new GetAllPostsSearchService();
        const posts = await getAllPostsSearchService.execute(keyword);

        response.status(200).send(new Result(200, "Success", posts));
    } catch (error) {
        errorHandler(error, response);
    }
}
