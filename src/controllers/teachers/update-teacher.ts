import { Request, Response } from "express";

import { Result } from "../../types/result";
import { teacherBodySchema, teacherParamsSchema } from "../../utils/schemas";
import { errorHandler } from "../../utils/errorHandler";
import { UpdateTeacherService } from "../../services/teachers/update-teacher-service";

export async function updateTeacher(request: Request, response: Response) {
    try {
        const { id } = teacherParamsSchema.parse(request.params);
        const { name, email, phone } = teacherBodySchema.parse(request.body);

        const updateTeacherService = new UpdateTeacherService();
        await updateTeacherService.execute(id, { name, email, phone });

        response.status(200).send(new Result(200, `Teacher '${name}' updated successfully`, null));
    } catch (error) {
        errorHandler(error, response)
    }
}
