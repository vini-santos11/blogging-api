import { TeacherDto } from "../../dto/teacher-dto";
import { teacherRepository } from "../../repositories/teacher-repository";
import { handleTeacherNotFound } from "../../utils/errorHandler";

export class UpdateTeacherService {
    private teacherRepository = teacherRepository;

    async execute(id: string, updatedPost: TeacherDto) {
        const post = await this.teacherRepository.findOne({
            where: { id }
        });

        if (!post) {
            handleTeacherNotFound();
        }

        return await this.teacherRepository.createQueryBuilder()
            .update(post)
            .set({
                name: updatedPost.name,
                phone: updatedPost.phone,
                email: updatedPost.email,
            })
            .where("id = :id", { id })
            .execute();
    }
}
