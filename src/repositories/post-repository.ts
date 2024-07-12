import { AppDataSource } from "../database/data-source";
import { Post } from "../entities/post";

export const postRepository = AppDataSource.getRepository(Post);