import { Response } from "express";
import { Result } from "../../types/result";
import { GetAllPostsService } from "../../services/posts/get-all-posts-service";
import { errorHandler } from "../../utils/errorHandler";

export async function getAllPosts(_: any, response: Response) {
    try {
        const getAllPostsService = new GetAllPostsService();
        const posts = await getAllPostsService.execute();

        response.status(200).send(new Result(200, "Success", posts));
    } catch (error) {
        errorHandler(error, response);
    }
}
