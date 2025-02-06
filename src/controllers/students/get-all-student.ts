import { Response } from "express";

import { Result } from "../../types/result";
import { errorHandler } from "../../utils/errorHandler";
import { GetAllStudentService } from "../../services/students/get-all-student-service";

export async function getAllStudents(request: Request, response: Response) {
    try {
        const getAllStudentService = new GetAllStudentService();
        const posts = await getAllStudentService.execute();

        response.status(200).send(new Result(200, "Success", posts));
    } catch (error) {
        errorHandler(error, response);
    }
}
