import { Router } from "express";
import { createPost } from "../controllers/posts/create-post";
import { getPostById } from "../controllers/posts/get-post-by-id";

const routes = Router();

routes.post("/posts", createPost);
routes.get("/posts/:id", getPostById);

export default routes;