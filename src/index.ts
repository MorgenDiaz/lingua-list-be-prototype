require("dotenv").config();
import express from "express";
import { env } from "process";
import "./controllers/ChallengeController";
const PORT: Number = env["PORT"] ? Number(env["PORT"]) : 3000;
import { router } from "./controllers/decorators/controller";

const app = express();

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
