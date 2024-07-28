import { hash } from 'bcryptjs';
import { Request, Response } from "express";

import { CreateUserService } from "../../services/users/create-user-service";
import { errorHandler } from "../../utils/errorHandler";
import { userBodySchema } from "../../utils/schemas";
import { Result } from "../../types/result";


export async function createUser(request: Request, response: Response) {
    try {
        const { username, password } = userBodySchema.parse(request.body);

        const hashedPassword = await hash(password, 8);

        const createUserService = new CreateUserService();
        const user = await createUserService.execute({ username, password: hashedPassword });

        response.status(201).send(new Result(201, 'User created successfully', { id: user.id, username: user.username, createdAt: user.createdAt }));
    } catch (error) {
        errorHandler(error, response);
    }
}