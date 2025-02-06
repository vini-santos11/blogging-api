import { StudentDto } from "../../dto/student-dto";
import { studentRepository } from "../../repositories/student-repository";

export class CreateStudentService {
    private studentRepository = studentRepository;

    async execute(data: StudentDto) {
        const event = this.studentRepository.create(data);
        return await this.studentRepository.save(event);
    }
}