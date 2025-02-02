import { Request, Response } from "express";
import { Result } from "../../types/result";
import { eventParamsSchema, postParamsSchema } from "../../utils/schemas";
import { errorHandler } from "../../utils/errorHandler";
import { GetEventByIdService } from "../../services/events/get-event-by-id-service";

export async function getEventById(request: Request, response: Response) {
    try {
        const { id } = eventParamsSchema.parse(request.params);

        const getEventByIdService = new GetEventByIdService();
        const event = await getEventByIdService.execute(id);

        response.status(200).send(new Result(200, "Success", event));
    } catch (error) {
        errorHandler(error, response);
    }
}
