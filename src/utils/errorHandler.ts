import { Response } from "express";
import { Result } from "../types/result";

export function errorHandler(error: any, response: Response) {
    if (error.message === "Post not found") {
        return response.status(404).send(new Result(404, 'Post not found'));
    }

    if (error.code === "22P02") {
        return response.status(400).send(new Result(400, 'Invalid syntax for uuid'));
    }

    response.status(400).send(new Result(400, String(error), null));
}

export function handlePostNotFound() {
    throw ({ message: "Post not found" })
}