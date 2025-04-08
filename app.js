import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import { FRONTEND_URL } from "./config.js";

import dotenv from 'dotenv';
dotenv.config();




const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", tasksRoutes);




/* if (process.env.NODE_ENV === "production") {
  import("path").then((path) => {
    app.use(express.static("client/dist"));
    
    app.get("*", (req, res) => {
      console.log(path.default.resolve("client", "dist", "index.html"));
      res.sendFile(path.default.resolve("client", "dist", "index.html"));
    });
  });
} */







export default app;
