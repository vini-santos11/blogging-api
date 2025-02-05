import { Request, Response } from "express";

import { Result } from "../../types/result";
import { errorHandler } from "../../utils/errorHandler";
import { teacherParamsSchema } from "../../utils/schemas";
import { GetTeacherByIdService } from "../../services/teachers/get-teacher-by-id-service";

export async function getTeacherById(request: Request, response: Response) {
    try {
        const { id } = teacherParamsSchema.parse(request.params);

        const getTeacherByIdService = new GetTeacherByIdService();
        const teacher = await getTeacherByIdService.execute(id);

        response.status(200).send(new Result(200, "Success", teacher));
    } catch (error) {
        errorHandler(error, response);
    }
}
