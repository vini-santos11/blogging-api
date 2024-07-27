import { LoginUserService } from './../../services/users/login-user-service';
import { Request, Response } from "express";
import { userBodySchema } from "../../utils/schemas";
import { compare } from 'bcryptjs';
import { errorHandler, handleInvalidCredentialsError } from '../../utils/errorHandler';
import { sign } from 'jsonwebtoken';
import { Result } from '../../types/result';
import 'dotenv/config';

export async function loginUser(request: Request, response: Response){
    const { username, password } = userBodySchema.parse(request.body);

    try {
        const JWT_SECRET = process.env.JWT_SECRET
        const loginUserService = new LoginUserService()
        const user = await loginUserService.execute(username)
        const doesPasswordMatch = await compare(password, user.password)
        if(!doesPasswordMatch) handleInvalidCredentialsError()
        const token = sign({ username }, JWT_SECRET, { expiresIn: '15m' })
        response.status(200).send(new Result(200, `User ${username} authenticated`, { token }));
    } catch (error) {
        errorHandler(error.message, response);
    }
}

