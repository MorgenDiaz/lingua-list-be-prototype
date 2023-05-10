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
const EnvironmentVariables_1 = require("../EnvironmentVariables");
class CompleteSentenceChallengeBuilder {
    constructor() {
        this.buildChallengeFromWord = (word) => __awaiter(this, void 0, void 0, function* () {
            const chatPrompt = `Create a sentence incorporating the word ${word}. Return a JSON-encoded object with the following keys:

    - "sentence": The generated sentence that incorporates the word ${word}.
    - "definition": The definition of the word ${word}.
    - "word": The word that was incorporated into the sentence.
    
    If the generated sentence uses a variation of the original word, such as a different tense or form, the "word" key should contain the modified version of the word. It is crucial that the word used in the sentence matches the word sent back in your response.
    `;
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
            const completeSentenceChallenge = new CompleteSentenceChallenge_1.CompleteSentenceChallenge(generatedSentenceForWord.word, generatedSentenceForWord.sentence, generatedSentenceForWord.definition);
            return completeSentenceChallenge;
        });
        const API_KEY = EnvironmentVariables_1.EnvironmentVariables.getInstance().OPEN_AI_API_KEY;
        const chatConfiguration = new openai_1.Configuration({
            apiKey: API_KEY,
        });
        this.openai = new openai_1.OpenAIApi(chatConfiguration);
    }
}
exports.CompleteSentenceChallengeBuilder = CompleteSentenceChallengeBuilder;
