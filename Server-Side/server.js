import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {router as authRouter} from "./Routers/auth.router.js";
import { router as contactRouter } from "./Routers/contact.router.js";
import {router as todoRouter} from "./Routers/todo.router.js";
import connectDB from "./utils/connectDB.js";
import errorMiddleware from "./middlewares/error.middleware.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/admin", contactRouter);
app.use("/api/todo",todoRouter);
app.use(errorMiddleware);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("database connection failed", err);
  });