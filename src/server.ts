import express from "express";
import { AppDataSource } from './database/data-source';
import routes from "./routes/index.routes";
import cors from 'cors';
import "reflect-metadata";

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

AppDataSource.initialize().then(() => {
    console.log('Database connected');

    app.listen(3001, async () => {
        console.log('Server is running on port 3001');
    })
})
