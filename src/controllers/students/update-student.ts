import { Request, Response } from "express";

import { Result } from "../../types/result";
import { postBodySchema, postParamsSchema, studentBodySchema, studentParamsSchema } from "../../utils/schemas";
import { errorHandler } from "../../utils/errorHandler";
import { UpdateStudentService } from "../../services/students/update-student-service";

export async function updateStudent(request: Request, response: Response) {
    try {
        const { id } = studentParamsSchema.parse(request.params);
        const { name, email, phone, identifier } = studentBodySchema.parse(request.body);

        const updateStudentService = new UpdateStudentService();
        await updateStudentService.execute(id, { name, email, phone, identifier });

        response.status(200).send(new Result(200, `Student '${name}' updated successfully`, null));
    } catch (error) {
        errorHandler(error, response)
    }
}
