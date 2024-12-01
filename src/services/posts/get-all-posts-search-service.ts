import { ILike } from "typeorm";
import { postRepository } from "../../repositories/post-repository";

export class GetAllPostsSearchService {
    private postRepository = postRepository;

    async execute(keyword: string) {
        const postsWithWordOnContent = await this.postRepository.findBy({ content: ILike(`%${keyword}%`) })
        const postsWithWordOnTitle = await this.postRepository.findBy({ title: ILike(`%${keyword}%`) })
        return [...postsWithWordOnContent, ...postsWithWordOnTitle];
    }
}