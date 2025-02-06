import { handleStudentNotFound } from '../../utils/errorHandler';
import { studentRepository } from './../../repositories/student-repository';

export class DeleteStudentService {
    private studentRepository = studentRepository;

    async execute(id: string) {
        const student = await this.studentRepository.findOne({
            where: { id }
        });

        if (!student) {
            handleStudentNotFound();
        }

        return await this.studentRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
    }
}
