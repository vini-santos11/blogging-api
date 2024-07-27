import { Request, Response, NextFunction  } from 'express';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import { errorHandler } from '../utils/errorHandler';

export function validateJwt(request: Request, response: Response, next: NextFunction ) {   
    try {
        const routeFreeList = ['POST-/users', 'POST-/users/login', 'GET-/posts']
        const validateRoutes = `${request.method}-${request.originalUrl}`;

        if (!routeFreeList.includes(validateRoutes)){
            const authorization = request.headers["authorization"];
            const token = authorization.split(" ")[1]
            const JWT_SECRET = process.env.JWT_SECRET;
            verify(token, JWT_SECRET);
        } 
        
        next();
    } catch (error) {
        errorHandler("Unauthorized", response);
    }
}