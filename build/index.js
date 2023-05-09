"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const EnvironmentVariables_1 = require("./application/EnvironmentVariables");
const seed_1 = require("./database/seed");
const AppRouter_1 = require("./application/AppRouter");
const VocabularyWordsAdapter_1 = __importDefault(require("./database/VocabularyWordsAdapter"));
require("./application/controllers/ChallengeController");
require("./application/controllers/VocabularyWordController");
const PORT = EnvironmentVariables_1.EnvironmentVariables.getInstance().PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const appRouter = AppRouter_1.AppRouter.getInstance();
app.use(appRouter);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port:${PORT}`);
    console.log("initializing database...");
    yield (0, seed_1.seed)();
    console.log("database initialized.");
    console.log("vocabulary words:");
    const words = yield new VocabularyWordsAdapter_1.default().getAllVocabularyWords();
    console.log(words);
}));
