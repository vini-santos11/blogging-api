import { Request, Response } from "express";
import { Result } from '../../types/result';
import { errorHandler } from '../../utils/errorHandler';
import { GetAllEventsService } from './../../services/events/get-all-events-service';

export async function getAllEvents(request: Request, response: Response) {
    try {
        const getAllEventsService = new GetAllEventsService();
        const events = await getAllEventsService.execute();

        response.status(200).send(new Result(200, "Success", events));
    } catch (error) {
        errorHandler(error, response);
    }
}
