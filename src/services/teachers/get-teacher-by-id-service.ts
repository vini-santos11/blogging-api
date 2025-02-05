import { teacherRepository } from "../../repositories/teacher-repository";
import { handleTeacherNotFound } from "../../utils/errorHandler";

export class GetTeacherByIdService {
    private teacherRepository = teacherRepository;

    async execute(id: string) {
        const event = await this.teacherRepository.findOne({
            where: { id }
        });

        if (!event) {
            handleTeacherNotFound();
        }

        return event;
    }
}