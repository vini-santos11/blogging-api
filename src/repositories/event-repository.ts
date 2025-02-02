import { AppDataSource } from "../database/data-source";
import { Events } from "../entities/events";

export const eventRepository = AppDataSource.getRepository(Events);