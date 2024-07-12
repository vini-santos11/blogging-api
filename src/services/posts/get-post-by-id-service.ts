import { postRepository } from "../../repositories/post-repository";

export class GetPostByIdService {
    private postRepository = postRepository;

    async execute(id: string) {
        var post = await this.postRepository.findOne({
            where: { id }
        });

        if (!post) {
            throw new Error("Post not found");
        }
        
        return post;
    }
}