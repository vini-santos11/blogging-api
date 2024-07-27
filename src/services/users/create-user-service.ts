import { UserDto } from "../../dto/user-dto";
import { userRepository } from "../../repositories/user-repository";
import { handleUserAlreadyExists } from "../../utils/errorHandler";

export class CreateUserService {
    private userRepository = userRepository;

    async execute(data: UserDto) {

        const user = await this.userRepository.findOne({
            where: { username: data.username }
        });

        if(user){
            handleUserAlreadyExists();
        }

        const newUser = this.userRepository.create(data);
        return await this.userRepository.save(newUser);
    }
}