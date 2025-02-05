import { eventRepository } from './../../repositories/event-repository';
import { handleEventNotFound, handlePostNotFound } from '../../utils/errorHandler';

export class DeleteEventService {
    private eventRepository = eventRepository;

    async execute(id: string) {
        const event = await this.eventRepository.findOne({
            where: { id }
        });

        if (!event) {
            handleEventNotFound();
        }

        return await this.eventRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
    }
}
