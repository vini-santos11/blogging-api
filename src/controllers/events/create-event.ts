import { Request, Response } from "express";
import { Result } from './../../types/result';
import { eventBodySchema } from "../../utils/schemas";
import { errorHandler } from "../../utils/errorHandler";
import { CreateEventService } from "../../services/events/create-event-service";

export async function createEvent(request: Request, response: Response) {
    try {
        const { name, description, startDate, endDate } = eventBodySchema.parse(request.body);

        const createEventService = new CreateEventService();
        const event = await createEventService.execute({ 
            name, 
            description, 
            startDate: new Date(startDate), 
            endDate: new Date(endDate) 
        });

        response.status(201).send(new Result(201, `Event '${name}' created successfully`, event));
    } catch (error) {
        errorHandler(error, response);
    }
}
