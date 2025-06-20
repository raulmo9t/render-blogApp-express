import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import path from "path";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middleware/errorHandler.js";
import cors from "cors";
import { fileURLToPath } from "url";
import commentRouter from "./routes/commentRoutes.js";
import postCategoriesRouter from "./routes/postCategoriesRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();
const app = express();
app.use(
  cors({
    exposedHeaders: [
      "x-filter",
      "x-totalpagecount",
      "x-totalcount",
      "x-currentpage",
      "x-pagesize",
    ],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "hi" });
});
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/post-categories", postCategoriesRouter);

// static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
