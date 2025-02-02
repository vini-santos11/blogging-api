import { EventDto } from "../../dto/event-dto";
import { eventRepository } from "../../repositories/event-repository";

export class CreateEventService {
    private eventRepository = eventRepository;

    async execute(data: EventDto) {
        const event = this.eventRepository.create(data);
        return await this.eventRepository.save(event);
    }
}