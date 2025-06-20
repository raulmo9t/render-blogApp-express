import express from "express";
import { authGuard, adminGuard } from "../middleware/authMiddleware.js";
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../controllers/commentControllers.js";

const commentRouter = express.Router();

commentRouter
  .route("/")
  .post(authGuard, createComment)
  .get(authGuard, adminGuard, getAllComments);
commentRouter
  .route("/:commentId")
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);

export default commentRouter;
