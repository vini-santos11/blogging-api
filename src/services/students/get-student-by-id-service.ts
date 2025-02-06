import { studentRepository } from "../../repositories/student-repository";
import { handleStudentNotFound } from "../../utils/errorHandler";

export class GetStudentByIdService {
    private studentRepository = studentRepository;

    async execute(id: string) {
        const event = await this.studentRepository.findOne({
            where: { id }
        });

        if (!event) {
            handleStudentNotFound();
        }

        return event;
    }
}