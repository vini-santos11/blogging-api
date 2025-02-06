import { studentRepository } from './../../repositories/student-repository';

export class GetAllStudentService {
    private studentRepository = studentRepository;

    async execute() {
        const teachers = await this.studentRepository.find({ select: { 
            name: true, 
            email: true, 
            identifier: true,
            schoolSupplies: true,
            createdAt: true, 
            updatedAt: true,
            phone: true,
            id: true }});
        return teachers;
    }
}