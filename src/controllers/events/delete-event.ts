import { Request, Response } from "express";

import { Result } from "../../types/result";
import { eventParamsSchema, postParamsSchema } from "../../utils/schemas";
import { errorHandler } from "../../utils/errorHandler";
import { DeleteEventService } from "../../services/events/delete-event-service";

export async function deleteEvent(request: Request, response: Response) {
    try {
        const { id } = eventParamsSchema.parse(request.params);

        const deleteEventService = new DeleteEventService();
        await deleteEventService.execute(id);

        response.status(200).send(new Result(200, `Event '${id}' deleted successfully`, null));
    } catch (error) {
        errorHandler(error, response)
    }
}
