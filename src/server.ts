import express from "express";
import { AppDataSource } from './database/data-source';
import routes from "./routes/index.routes";
import cors from 'cors';
import "reflect-metadata";
import 'dotenv/config'
import { validateJwt } from "./middlewares/validate-jwt";
import path = require("path");
import { setupRedoc } from "./middlewares/redoc.middleware";

const app = express();
setupRedoc(app)
app.use('/swagger.json', express.static(path.join(__dirname, 'swagger/swagger.json')));
app.use(express.json());
app.use(cors());
app.use(validateJwt)
app.use(routes);

AppDataSource.initialize().then(() => {
    console.log('Database connected');
    const PORT = process.env.PORT || 3001

    app.listen(PORT, async () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((e) => {
    console.log("Cannot connect to database server:", e)
})
