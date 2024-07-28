import 'dotenv/config';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Request, Response } from "express";

import { LoginUserService } from './../../services/users/login-user-service';
import { errorHandler, handleInvalidCredentialsError } from '../../utils/errorHandler';
import { userBodySchema } from "../../utils/schemas";
import { Result } from '../../types/result';

const JWT_SECRET = process.env.JWT_SECRET;

export async function loginUser(request: Request, response: Response) {
    try {
        const { username, password } = userBodySchema.parse(request.body);

        const loginUserService = new LoginUserService();
        const user = await loginUserService.execute(username);

        const isPasswordMatch = await compare(password, user.password);

        if (!isPasswordMatch) handleInvalidCredentialsError();

        const token = sign({ username }, JWT_SECRET, { expiresIn: '15m' });

        response.status(200).send(new Result(200, `User ${username} authenticated`, { token }));
    } catch (error) {
        errorHandler(error, response);
    }
}

