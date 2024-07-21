import { postRepository } from './../../repositories/post-repository';
import { handlePostNotFound } from '../../utils/errorHandler';

export class DeletePostService {
    private postRepository = postRepository;

    async execute(id: string) {
        const post = await this.postRepository.findOne({
            where: { id }
        });

        if (!post) {
            handlePostNotFound()
        }

        return await this.postRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute()
    }
}
