import { eventRepository } from "../../repositories/event-repository";
import { handleEventNotFound } from "../../utils/errorHandler";

export class GetEventByIdService {
    private eventRepository = eventRepository;

    async execute(id: string) {
        const event = await this.eventRepository.findOne({
            where: { id }
        });

        if (!event) {
            handleEventNotFound();
        }

        return event;
    }
}