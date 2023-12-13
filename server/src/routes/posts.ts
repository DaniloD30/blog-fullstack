import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/posts";
import { authMiddleware } from "../error-handler";

const postsRoutes: Router = Router();

postsRoutes.post("/posts", authMiddleware(createPost));

postsRoutes.get("/posts", authMiddleware(getAllPosts));

postsRoutes.get("/posts/:idPost", authMiddleware(getPostById));

postsRoutes.put("/posts/:idPost", authMiddleware(updatePost));

postsRoutes.delete("/posts/:idPost", authMiddleware(deletePost));
export default postsRoutes;
