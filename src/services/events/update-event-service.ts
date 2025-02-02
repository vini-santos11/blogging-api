import { EventDto } from '../../dto/event-dto';
import { handleEventNotFound } from '../../utils/errorHandler';
import { eventRepository } from './../../repositories/event-repository';
export class UpdateEventService {
    private eventRepository = eventRepository;

    async execute(id: string, updatedPost: EventDto) {
        const post = await this.eventRepository.findOne({
            where: { id }
        });

        if (!post) {
            handleEventNotFound();
        }

        return await this.eventRepository.createQueryBuilder()
            .update(post)
            .set({
                name: updatedPost.name,
                description: updatedPost.description,
                startDate: updatedPost.startDate,
                endDate: updatedPost.endDate,
            })
            .where("id = :id", { id })
            .execute();
    }
}
