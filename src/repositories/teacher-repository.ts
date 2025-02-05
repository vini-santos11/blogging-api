import { AppDataSource } from "../database/data-source";
import { Teacher } from "../entities/teacher";

export const teacherRepository = AppDataSource.getRepository(Teacher);