import { Like } from "typeorm";
import { postRepository } from "../../repositories/post-repository";

export class GetAllPostsSearchService {
    private postRepository = postRepository;

    async execute(keyword: string) {
        const posts = await this.postRepository.findBy({ content: Like(`%${keyword}%`) })
        return posts;
    }
}