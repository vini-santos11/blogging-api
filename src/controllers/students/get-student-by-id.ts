import { GetStudentByIdService } from './../../services/students/get-student-by-id-service';
import { Request, Response } from "express";

import { Result } from "../../types/result";
import { studentParamsSchema } from "../../utils/schemas";
import { errorHandler } from "../../utils/errorHandler";

export async function getStudentById(request: Request, response: Response) {
    try {
        const { id } = studentParamsSchema.parse(request.params);

        const getStudentByIdService = new GetStudentByIdService();
        const post = await getStudentByIdService.execute(id);

        response.status(200).send(new Result(200, "Success", post));
    } catch (error) {
        errorHandler(error, response);
    }
}
