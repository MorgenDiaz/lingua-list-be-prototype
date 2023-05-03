require("dotenv").config();
import { env } from "process";
import cors from "cors";
import express from "express";
import { EnvironmentVariables } from "./EnvironmentVariables";
import { AppRouter } from "./controllers/AppRouter";
import "./controllers/ChallengeController";
import "./controllers/VocabularyWordController";

const PORT: Number = EnvironmentVariables.getInstance().PORT;

const app = express();

app.use(cors());
const appRouter = AppRouter.getInstance();
app.use(appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
