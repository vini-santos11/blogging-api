import { teacherRepository } from "../../repositories/teacher-repository";

export class GetAllTeachersService {
    private teacherRepository = teacherRepository;

    async execute() {
        const teachers = await this.teacherRepository.find({ select: { 
            name: true, 
            email: true, 
            createdAt: true, 
            updatedAt: true,
            phone: true,
            id: true }});
        return teachers;
    }
}