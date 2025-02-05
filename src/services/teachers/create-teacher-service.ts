import { TeacherDto } from "../../dto/teacher-dto";
import { teacherRepository } from "../../repositories/teacher-repository";

export class CreateTeacherService {
    private teacherRepository = teacherRepository;

    async execute(data: TeacherDto) {
        const event = this.teacherRepository.create(data);
        return await this.teacherRepository.save(event);
    }
}