import { Router } from "express";
import { createPost } from "../controllers/posts/create-post";
import { getPostById } from "../controllers/posts/get-post-by-id";
import { getAllPosts } from "../controllers/posts/get-all-posts";
import { updatePost } from "../controllers/posts/update-post";

const routes = Router();

routes.post("/posts", createPost);
routes.get("/posts/:id", getPostById);
routes.get("/posts", getAllPosts)
routes.put("/posts/:id", updatePost);

export default routes;