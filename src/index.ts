require("dotenv").config();
import { env } from "process";
import cors from "cors";
import express from "express";
import { EnvironmentVariables } from "./application/EnvironmentVariables";
import { AppRouter } from "./application/AppRouter";
import VocabularyWordsAdapter from "./database/VocabularyWordsAdapter";
import "./application/controllers/ChallengeController";
import "./application/controllers/VocabularyWordController";

const PORT: Number = EnvironmentVariables.getInstance().PORT;

const app = express();

app.use(cors());
const appRouter = AppRouter.getInstance();
app.use(appRouter);

app.listen(PORT, async () => {
  console.debug(`Server is running on port:${PORT}`);
});
