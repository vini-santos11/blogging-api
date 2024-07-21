import { Router } from "express";
import { createPost } from "../controllers/posts/create-post";
import { deletePost } from "../controllers/posts/delete-post";
import { getPostById } from "../controllers/posts/get-post-by-id";
import { getAllPosts } from "../controllers/posts/get-all-posts";
import { updatePost } from "../controllers/posts/update-post";

const routes = Router();

routes.delete("/posts/:id", deletePost);
routes.get("/posts/:id", getPostById);
routes.get("/posts", getAllPosts)
routes.post("/posts", createPost);
routes.put("/posts/:id", updatePost);

export default routes;