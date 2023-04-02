require("dotenv").config();
import express from "express";
import { env } from "process";

const PORT: Number = env["PORT"] ? Number(env["PORT"]) : 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
