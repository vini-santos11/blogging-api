import { postRepository } from "../../repositories/post-repository";

export class GetAllPostsService {
    private postRepository = postRepository;

    async execute() {
        const posts = await this.postRepository.find()

        if (!posts) {
            throw new Error("Posts not found");
        }

        return posts;
    }
}