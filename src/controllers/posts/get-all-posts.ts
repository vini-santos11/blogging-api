import { Request, Response } from "express";
import { Result } from "../../types/result";
import { GetAllPostsService } from "../../services/posts/get-all-posts-service";

export async function getAllPosts(request: Request, response: Response) {
    try {
        const getAllPostsService = new GetAllPostsService();
        const posts = await getAllPostsService.execute();
        response.status(200).send(new Result(200, null, posts));
    } catch (error) {
        response.status(400).send(new Result(400, String(error), null));
    }
}