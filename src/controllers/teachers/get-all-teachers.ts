import { Response } from "express";

import { Result } from "../../types/result";
import { errorHandler } from "../../utils/errorHandler";
import { GetAllTeachersService } from "../../services/teachers/get-all-teachers-service";

export async function getAllTeachers(request: Request, response: Response) {
    try {
        const getAllTeachersService = new GetAllTeachersService();
        const posts = await getAllTeachersService.execute();

        response.status(200).send(new Result(200, "Success", posts));
    } catch (error) {
        errorHandler(error, response);
    }
}
