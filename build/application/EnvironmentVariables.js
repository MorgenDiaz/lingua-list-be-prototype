"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentVariables = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = require("process");
class EnvironmentVariables {
    constructor() {
        dotenv_1.default.config();
        const openAiKey = process_1.env.OPEN_AI_API_KEY;
        const port = process_1.env.PORT;
        const maxGeneratedSentencesPerWord = process_1.env.MAX_GENERATED_SENTENCES_PER_WORD;
        if (!openAiKey) {
            console.error("An openAI api key is required. Please add your api key to your environment variables under the property OPEN_AI_API_KEY.");
            this.OPEN_AI_API_KEY = "missing-key";
        }
        else {
            this.OPEN_AI_API_KEY = openAiKey;
        }
        this.PORT = port ? Number.parseInt(port) : 90001;
        this.MAX_GENERATED_SENTENCES_PER_WORD = maxGeneratedSentencesPerWord
            ? Number(maxGeneratedSentencesPerWord)
            : 0;
    }
}
_a = EnvironmentVariables;
EnvironmentVariables.getInstance = () => {
    if (!_a.instance) {
        _a.instance = new EnvironmentVariables();
    }
    return _a.instance;
};
exports.EnvironmentVariables = EnvironmentVariables;
