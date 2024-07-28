import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "app",
    password: "app",
    database: "blogging-db",
    entities: [
        "src/entities/*.{ts,js}"
    ],
    migrations: [
        "src/database/migrations/*.{ts,js}"
    ]
})