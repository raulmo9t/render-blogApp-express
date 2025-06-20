import express from "express";
import {
  deleteUser,
  getAllUsers,
  loginUser,
  registerUser,
  updateProfile,
  updateProfilePicture,
  userProfile,
} from "../controllers/userControllers.js";
import { adminGuard, authGuard } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authGuard, userProfile);
userRouter.put("/update-profile/:userId", authGuard, updateProfile);
userRouter.put("/update-profile-picture", authGuard, updateProfilePicture);
userRouter.get("/", authGuard, adminGuard, getAllUsers);
userRouter.delete("/:userId", authGuard, adminGuard, deleteUser);

export default userRouter;
