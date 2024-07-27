import { Router } from "express";
import { createPost } from "../controllers/posts/create-post";
import { deletePost } from "../controllers/posts/delete-post";
import { getPostById } from "../controllers/posts/get-post-by-id";
import { getAllPosts } from "../controllers/posts/get-all-posts";
import { updatePost } from "../controllers/posts/update-post";
import { createUser } from "../controllers/users/create-user";
import { loginUser } from "../controllers/users/login-user";
import { getAllPostsAdmin } from "../controllers/posts/get-all-posts-admin";
import { getAllPostsSearch } from "../controllers/posts/get-all-posts-search";

const routes = Router();

routes.put("/posts/:id", updatePost);
routes.delete("/posts/:id", deletePost);
routes.get("/posts/search", getAllPostsSearch);
routes.get("/posts/admin", getAllPostsAdmin);
routes.get("/posts/:id", getPostById);
routes.get("/posts", getAllPosts);
routes.post("/posts", createPost);
routes.post("/users", createUser);
routes.post("/users/login", loginUser);

export default routes;