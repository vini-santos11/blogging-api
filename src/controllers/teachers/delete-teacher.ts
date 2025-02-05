import { Request, Response } from "express";

import { Result } from "../../types/result";
import { teacherBodySchema, teacherParamsSchema } from "../../utils/schemas";
import { errorHandler } from "../../utils/errorHandler";
import { DeleteTeacherService } from "../../services/teachers/delete-teacher-service";

export async function deleteTeacher(request: Request, response: Response) {
    try {
        const { id } = teacherParamsSchema.parse(request.params);

        const deleteTeacherService = new DeleteTeacherService();
        await deleteTeacherService.execute(id);

        response.status(200).send(new Result(200, `Teacher '${id}' deleted successfully`, null));
    } catch (error) {
        errorHandler(error, response)
    }
}
