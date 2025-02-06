import { Request, Response } from "express";

import { Result } from "../../types/result";
import { studentParamsSchema } from "../../utils/schemas";
import { errorHandler } from "../../utils/errorHandler";
import { DeleteStudentService } from "../../services/students/delete-student-service";

export async function deleteStudent(request: Request, response: Response) {
    try {
        const { id } = studentParamsSchema.parse(request.params);

        const deleteStudentService = new DeleteStudentService();
        await deleteStudentService.execute(id);

        response.status(200).send(new Result(200, `Student '${id}' deleted successfully`, null));
    } catch (error) {
        errorHandler(error, response)
    }
}
