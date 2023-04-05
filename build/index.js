"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const process_1 = require("process");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const AppRouter_1 = require("./controllers/AppRouter");
require("./controllers/ChallengeController");
require("./controllers/VocabularyWordController");
const PORT = process_1.env["PORT"] ? Number(process_1.env["PORT"]) : 3000;
const app = (0, express_1.default)();
app.use(cors_1.default);
const appRouter = AppRouter_1.AppRouter.getInstance();
app.use(appRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
