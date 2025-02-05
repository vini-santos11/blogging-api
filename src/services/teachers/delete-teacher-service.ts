import { teacherRepository } from "../../repositories/teacher-repository";
import { handleTeacherNotFound } from "../../utils/errorHandler";

export class DeleteTeacherService {
    private teacherRepository = teacherRepository;

    async execute(id: string) {
        const post = await this.teacherRepository.findOne({
            where: { id }
        });

        if (!post) {
            handleTeacherNotFound();
        }

        return await this.teacherRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
    }
}
