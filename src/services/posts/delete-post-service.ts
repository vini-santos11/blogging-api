import { postRepository } from './../../repositories/post-repository';

export class DeletePostService {
    private postRepository = postRepository;

    async execute(id: string) {
        const post = await this.postRepository.findOne({
            where: { id }
        });

        if (!post) {
            throw "Post not found"
        }

        return await this.postRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute()
    }
}
