import { Request, Response } from "express";

import { Result } from './../../types/result';
import { errorHandler } from "../../utils/errorHandler";
import { studentBodySchema } from "../../utils/schemas";
import { CreateStudentService } from "../../services/students/create-student-service";

export async function createStudent(request: Request, response: Response) {
    try {
        const { name, phone, email, identifier } = studentBodySchema.parse(request.body);

        const createStudentService = new CreateStudentService();
        const post = await createStudentService.execute({ name, phone, email, identifier });

        response.status(201).send(new Result(201, `Student '${name}' created successfully`, post));
    } catch (error) {
        errorHandler(error, response);
    }
}
