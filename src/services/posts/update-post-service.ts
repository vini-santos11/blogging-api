import { postRepository } from './../../repositories/post-repository';
import { PostDto } from "../../dto/post-dto";
import { handlePostNotFound } from '../../utils/errorHandler';

export class UpdatePostService {
    private postRepository = postRepository;

    async execute(id: string, updatedPost: PostDto) {
        const post = await this.postRepository.findOne({
            where: { id }
        });

        if (!post) {
            handlePostNotFound()
        }

        return await this.postRepository.createQueryBuilder()
            .update(post)
            .set({
                title: updatedPost.title,
                content: updatedPost.content,
            })
            .where("id = :id", { id })
            .execute()
    }
}
