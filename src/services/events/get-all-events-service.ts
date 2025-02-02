import { eventRepository } from "../../repositories/event-repository";

export class GetAllEventsService {
    private eventsRepository = eventRepository;

    async execute() {
        const posts = await this.eventsRepository.find({ select: { 
            name: true, 
            description: true, 
            createdAt: true, 
            updatedAt: true,
            startDate: true,
            endDate: true,
            id: true }});
        return posts;
    }
}