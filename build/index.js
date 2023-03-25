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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const openai_1 = require("openai");
const API_KEY = process.env.OPEN_AI_API_KEY;
if (!API_KEY) {
    throw new Error("error locating api key.");
}
const chatConfiguration = new openai_1.Configuration({
    apiKey: API_KEY,
});
const openai = new openai_1.OpenAIApi(chatConfiguration);
const chatPrompt = `could you create a sentence incorporating the word surreptitious or variations of surreptitious.`;
const options = {
    model: "text-davinci-003",
    prompt: chatPrompt,
    temperature: 0.5,
    max_tokens: 200,
    n: 1,
    stream: false,
};
const promptAi = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield openai.createCompletion(options);
    const { choices } = response.data;
    console.log(choices[0].text);
});
promptAi();
