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
exports.SentenceBuilder = void 0;
const openai_1 = require("openai");
class SentenceBuilder {
    constructor() {
        this.getSentenceForWord = (word) => __awaiter(this, void 0, void 0, function* () {
            const originalPrompt = `could you create a sentence incorporating the word ${word} or variations of ${word}.`;
            const devPrompt = `create a sentence incorporating the word ${word}. return a json encoded response with the key sentence which contains the generated sentence and the key definition which contains the definition of the word ${word}.`;
            const chatPrompt = devPrompt;
            const options = {
                model: "text-davinci-003",
                prompt: chatPrompt,
                temperature: 0.5,
                max_tokens: 250,
                n: 1,
                stream: false,
            };
            const response = yield this.openai.createCompletion(options);
            const { choices } = response.data;
            const generatedSentence = choices[0].text;
            const payload = JSON.parse(choices[0].text || "");
            console.log(payload);
            return generatedSentence ? generatedSentence : "error generating sentence.";
        });
        const API_KEY = process.env.OPEN_AI_API_KEY;
        if (!API_KEY) {
            throw new Error("error locating api key.");
        }
        const chatConfiguration = new openai_1.Configuration({
            apiKey: API_KEY,
        });
        this.openai = new openai_1.OpenAIApi(chatConfiguration);
    }
}
exports.SentenceBuilder = SentenceBuilder;
