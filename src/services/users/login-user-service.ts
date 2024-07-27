import { userRepository } from "../../repositories/user-repository";
import { handleInvalidCredentialsError } from "../../utils/errorHandler";

export class LoginUserService {
    private userRepository = userRepository;

    async execute(username: string) {
        const user = await this.userRepository.findOne({
            where: { username }
        });

        if(!user) handleInvalidCredentialsError();

        return user;
    }
}