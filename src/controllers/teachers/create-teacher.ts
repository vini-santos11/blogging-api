import { Request, Response } from "express";
import { CreateTeacherService } from "../../services/teachers/create-teacher-service";
import { teacherBodySchema } from "../../utils/schemas";
import { Result } from "../../types/result";
import { errorHandler } from "../../utils/errorHandler";

export async function createTeacher(request: Request, response: Response) {
    try {
        const { name, email, phone } = teacherBodySchema.parse(request.body);

        const createTeacherService = new CreateTeacherService();
        const post = await createTeacherService.execute({ name, email, phone });

        response.status(201).send(new Result(201, `Teacher '${name}' created successfully`, post));
    } catch (error) {
        errorHandler(error, response);
    }
}
