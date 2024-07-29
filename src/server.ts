import cors from "cors";
import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import { setupRedoc } from "./middlewares/redoc.middleware";
import { validateJwt } from "./middlewares/validate-jwt";
import routes from "./routes/index.routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(validateJwt);
app.use(routes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    const PORT = process.env.PORT || 3001;

    setupRedoc(app);
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Cannot connect to database server:", e);
  });
