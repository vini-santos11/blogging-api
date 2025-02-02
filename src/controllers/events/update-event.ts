import { Request, Response } from "express";
import { Result } from "../../types/result";
import { eventBodySchema, eventParamsSchema } from "../../utils/schemas";
import { errorHandler } from "../../utils/errorHandler";
import { UpdateEventService } from "../../services/events/update-event-service";

export async function updateEvent(request: Request, response: Response) {
    try {
        const { id } = eventParamsSchema.parse(request.params);
        const { name, description, startDate: startDateString, endDate: endDateString } = eventBodySchema.parse(request.body);
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        const updateEventService = new UpdateEventService();
        await updateEventService.execute(id, { name, description, startDate, endDate });

        response.status(200).send(new Result(200, `Event '${name}' updated successfully`, null));
    } catch (error) {
        errorHandler(error, response)
    }
}
