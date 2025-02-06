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
import { createEvent } from "../controllers/events/create-event";
import { getAllEvents } from "../controllers/events/get-all-events";
import { getEventById } from "../controllers/events/get-event-by-id";
import { updateEvent } from "../controllers/events/update-event";
import { getAllTeachers } from "../controllers/teachers/get-all-teachers";
import { getTeacherById } from "../controllers/teachers/get-teacher-by-id";
import { createTeacher } from "../controllers/teachers/create-teacher";
import { updateTeacher } from "../controllers/teachers/update-teacher";
import { deleteTeacher } from "../controllers/teachers/delete-teacher";
import { deleteEvent } from "../controllers/events/delete-event";
import { getAllStudents } from "../controllers/students/get-all-student";
import { getStudentById } from "../controllers/students/get-student-by-id";
import { createStudent } from "../controllers/students/create-student";
import { updateStudent } from "../controllers/students/update-student";
import { deleteStudent } from "../controllers/students/delete-student";

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

routes.post("/events", validateJwt, createEvent);
routes.get("/events", validateJwt, getAllEvents);
routes.get("/events/:id", validateJwt, getEventById);
routes.put("/events/:id", validateJwt, updateEvent);
routes.delete("/events/:id", validateJwt, deleteEvent);

routes.get("/teachers", validateJwt, getAllTeachers);
routes.get("/teachers/:id", validateJwt, getTeacherById);
routes.post("/teachers", validateJwt, createTeacher);
routes.put("/teachers/:id", validateJwt, updateTeacher);
routes.delete("/teachers/:id", validateJwt, deleteTeacher);

routes.get("/students", validateJwt, getAllStudents);
routes.get("/students/:id", validateJwt, getStudentById);
routes.post("/students", validateJwt, createStudent);
routes.put("/students/:id", validateJwt, updateStudent);
routes.delete("/students/:id", validateJwt, deleteStudent);

export default routes;
