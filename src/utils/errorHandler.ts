import { Response } from "express";
import { ZodError } from 'zod'
import { Result } from "../types/result";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function errorHandler(error: any, response: Response) {
    if (error instanceof ZodError) {
        return response.status(400).send(new Result(400, error.issues[0].message, error.issues[0]))
    }

    if (error.message === "Post not found") {
        return response.status(404).send(new Result(404, error.message, error));
    }

    if (error.code === "22P02") {
        return response.status(400).send(new Result(400, 'Invalid syntax for uuid', error.message));
    }

    if (error === "Unauthorized") {
        return response.status(401).send(new Result(401, 'Unauthorized', error));
    }

    if (error.name === "Invalid password") {
        return response.status(404).send(new Result(404, 'Username or password is incorrect', null));
    }

    response.status(400).send(new Result(400, String(error.message), null));
}

export function handlePostNotFound() {
    throw ({ name: 'Not found', message: "Post not found" })
}

export function handleUserAlreadyExists() {
    throw ({ name: 'Conflict', message: "User already exists" })
}

export function handleInvalidCredentialsError() {
    throw ({ name: 'Invalid password', message: "Username or password is incorrect" })
}
