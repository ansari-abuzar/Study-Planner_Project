import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "../src/routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use("/tasks", taskRoutes);

app.use(errorHandler);

export default app;
