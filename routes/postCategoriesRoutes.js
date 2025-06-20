import express from "express";
import {} from "../controllers/userControllers.js";
import { adminGuard, authGuard } from "../middleware/authMiddleware.js";
import {
  createPostCategory,
  deletePostCategory,
  getAllPostCategories,
  getSingleCategory,
  updatePostCategory,
} from "../controllers/postCategoriesController.js";

const postCategoriesRouter = express.Router();

postCategoriesRouter
  .route("/")
  .post(authGuard, adminGuard, createPostCategory)
  .get(getAllPostCategories);

postCategoriesRouter
  .route("/:postCategoryId")
  .get(getSingleCategory)
  .put(authGuard, adminGuard, updatePostCategory)
  .delete(authGuard, adminGuard, deletePostCategory);

export default postCategoriesRouter;
