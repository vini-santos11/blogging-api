import { postRepository } from "../../repositories/post-repository";

export class GetAllPostsService {
    private postRepository = postRepository;

    async execute() {
        const posts = await this.postRepository.find({ select: { title: true, content: true, createdAt: true, id: true }});
        return posts;
    }
}