require("dotenv").config();
import { env } from "process";
import express from "express";
import { AppRouter } from "./controllers/AppRouter";
import "./controllers/ChallengeController";

const PORT: Number = env["PORT"] ? Number(env["PORT"]) : 3000;

const app = express();
const appRouter = AppRouter.getInstance();

app.use(appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
