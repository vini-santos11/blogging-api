import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/create-user-service";
import { errorHandler } from "../../utils/errorHandler";
import { userBodySchema } from "../../utils/schemas";
import { Result } from "../../types/result";
import { hash } from 'bcryptjs';

export async function createUser(request: Request, response: Response) {
    const { username, password } = userBodySchema.parse(request.body);
    const hashedPassword = await hash(password, 8);
    const userWithHashedPassword = { username, password: hashedPassword };

    try {
        const createUserService = new CreateUserService();
        const user = await createUserService.execute(userWithHashedPassword);

        response.status(201).send(new Result(201, `Use ${username} created successfully`, { id: user.id, username: user.username, createdAt: user.createdAt }));
    } catch (error) {
        errorHandler(error.message, response);
    }
}