"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const EnvironmentVariables_1 = require("./EnvironmentVariables");
const AppRouter_1 = require("./controllers/AppRouter");
require("./controllers/ChallengeController");
require("./controllers/VocabularyWordController");
const PORT = EnvironmentVariables_1.EnvironmentVariables.getInstance().PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const appRouter = AppRouter_1.AppRouter.getInstance();
app.use(appRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
