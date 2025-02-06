import { AppDataSource } from "../database/data-source";
import { Student } from "../entities/student";

export const studentRepository = AppDataSource.getRepository(Student);