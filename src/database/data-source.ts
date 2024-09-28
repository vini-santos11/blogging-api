import "dotenv/config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "db",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "app",
    password: process.env.DB_PASSWORD || "app",
    database: process.env.DB_NAME || "blogging-db",
    entities: [
        "src/entities/*.{ts,js}"
    ],
    migrations: [
        "src/database/migrations/*.{ts,js}"
    ],
    migrationsRun: true,
})