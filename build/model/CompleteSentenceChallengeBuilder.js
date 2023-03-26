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
exports.CompleteSentenceChallengeBuilder = void 0;
const openai_1 = require("openai");
const CompleteSentenceChallenge_1 = require("./CompleteSentenceChallenge");
class CompleteSentenceChallengeBuilder {
    constructor() {
        this.buildChallengeFromWord = (word) => __awaiter(this, void 0, void 0, function* () {
            const chatPrompt = `create a sentence incorporating the word ${word}. return a json encoded response with the key sentence which contains the generated sentence, the key definition which contains the definition of the word ${word}, and the key word which contains the word you constructed the sentence around. if you modified the original word, be sure to send the modified word in the response instead of the original.`;
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
            const generatedSentenceForWord = JSON.parse(choices[0].text || "");
            const completeSentenceChallenge = new CompleteSentenceChallenge_1.CompleteSentenceChallenge(generatedSentenceForWord);
            return completeSentenceChallenge;
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
exports.CompleteSentenceChallengeBuilder = CompleteSentenceChallengeBuilder;
