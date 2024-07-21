import { postRepository } from './../../repositories/post-repository';
import { PostDto } from "../../dto/post-dto";


export class CreatePostService {
    private postRepository = postRepository;

    async execute(data: PostDto) {
        const post = this.postRepository.create(data);
        return await this.postRepository.save(post);
    }
}