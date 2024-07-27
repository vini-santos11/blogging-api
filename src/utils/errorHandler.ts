import { Response } from "express";
import { Result } from "../types/result";

export function errorHandler(error: any, response: Response) {
    if (error.message === "Post not found") {
        return response.status(404).send(new Result(404, error.message));
    }else if (error.code === "22P02") {
        return response.status(400).send(new Result(400, 'Invalid syntax for uuid'));
    }else if(error === "Unauthorized" ){
        return response.status(401).send(new Result(401, error));
    }else if(error === "Username or password is incorrect"){
        return response.status(404).send(new Result(404, error));
    }

    response.status(400).send(new Result(400, String(error), null));
}

export function handlePostNotFound() {
    throw ({ message: "Post not found" })
}

export function handleUserAlreadyExists() {
    throw ({ message: "User already exists" })
}

export function handleInvalidCredentialsError() {
    throw ({ message: "Username or password is incorrect" })
}