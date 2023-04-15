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
exports.DistinctiveWordListBuilder = void 0;
const openai_1 = require("openai");
const VocabularyList_1 = require("./VocabularyList");
class DistinctiveWordListBuilder {
    constructor(words) {
        this.words = words;
        this.build = (listSize) => __awaiter(this, void 0, void 0, function* () {
            if (listSize < 1)
                throw new Error("Invalid list size. Please provide a list size greater than zero.");
            const constrainedListSize = Math.min(this.words.length, listSize);
            const chatPrompt = `
        Select ${constrainedListSize} words in random order from the array of words I provide.
        Please ensure that none of the words are synonyms.
        If it is not possible to construct a list of words for the specified length ${constrainedListSize}
        without words of the same meaning, then use as few synonomous words as possible
        when constructing the list. Your response should contain , separated words in a single line.

        Here are the words I would like you to select from.

        ${this.words}
        `;
            const options = {
                model: "text-davinci-003",
                prompt: chatPrompt,
                temperature: 0.8,
                max_tokens: 250,
                n: 1,
                stream: false,
            };
            const response = yield this.openai.createCompletion(options);
            const { choices } = response.data;
            const [firstChoice] = choices;
            if (!firstChoice.text) {
                throw new Error("OpenAI failed to generate any list items.");
            }
            const wordList = firstChoice.text.trim().split(",");
            return new VocabularyList_1.VocabularyList(wordList);
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
exports.DistinctiveWordListBuilder = DistinctiveWordListBuilder;
