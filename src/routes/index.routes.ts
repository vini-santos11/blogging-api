import { Router } from "express";
import { createPost } from "../controllers/posts/create-post";
import { deletePost } from "../controllers/posts/delete-post";
import { getAllPosts } from "../controllers/posts/get-all-posts";
import { getAllPostsAdmin } from "../controllers/posts/get-all-posts-admin";
import { getAllPostsSearch } from "../controllers/posts/get-all-posts-search";
import { getPostById } from "../controllers/posts/get-post-by-id";
import { updatePost } from "../controllers/posts/update-post";
import { createUser } from "../controllers/users/create-user";
import { loginUser } from "../controllers/users/login-user";
import { validateJwt } from "../middlewares/validate-jwt";

const routes = Router();

routes.put("/posts/:id", validateJwt, updatePost);
routes.delete("/posts/:id", validateJwt, deletePost);
routes.get("/posts/search", getAllPostsSearch);
routes.get("/posts/admin", validateJwt, getAllPostsAdmin);
routes.get("/posts/:id", getPostById);
routes.get("/posts", getAllPosts);
routes.post("/posts", validateJwt, createPost);
routes.post("/users", createUser);
routes.post("/users/login", loginUser);

export default routes;
