import { studentRepository } from './../../repositories/student-repository';
import { handleStudentNotFound, handleTeacherNotFound } from "../../utils/errorHandler";
import { StudentDto } from '../../dto/student-dto';

export class UpdateStudentService {
    private studentRepository = studentRepository;

    async execute(id: string, updatedPost: StudentDto) {
        const post = await this.studentRepository.findOne({
            where: { id }
        });

        if (!post) {
            handleStudentNotFound();
        }

        return await this.studentRepository.createQueryBuilder()
            .update(post)
            .set({
                name: updatedPost.name,
                phone: updatedPost.phone,
                email: updatedPost.email,
                identifier: updatedPost.identifier,
            })
            .where("id = :id", { id })
            .execute();
    }
}
