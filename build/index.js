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
const readline_1 = __importDefault(require("readline"));
const figlet = require("figlet");
const vocabWords = require("./data/VocabWords");
const VocabularyList_1 = require("./model/VocabularyList");
const SentenceBuilder_1 = require("./model/SentenceBuilder");
const vocabList = new VocabularyList_1.VocabularyList(vocabWords);
const randomVocabWord = vocabList.getRandomWord();
const sentenceBuilder = new SentenceBuilder_1.SentenceBuilder();
const processUserAnswer = (answer, connection) => {
    connection.close();
    const isCorrectAnswer = answer.trim().toLowerCase() === randomVocabWord;
    if (isCorrectAnswer) {
        console.log("you chose correctly!");
        process.exit(0);
        process.exit(0);
    }
    else {
        console.log("Sorry, that was not the correct word. Please, try again!");
        promptUserForAnswer();
    }
};
const promptUserForAnswer = () => {
    const readline = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readline.question("Please enter the word that best fits the sentence, from you vocabulary list. \n", (answer) => {
        processUserAnswer(answer, readline);
    });
};
figlet("LinguaList", function (err, data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data);
        console.log(`Selecting random word from list:
        
    `);
        for (const word of vocabWords) {
            console.log(word);
        }
        const sentence = yield sentenceBuilder.getSentenceForWord(randomVocabWord);
        const wordPlaceHolder = new Array(randomVocabWord.length)
            .fill("*")
            .join("");
        const sentenceHiddenWord = sentence.replace(randomVocabWord, wordPlaceHolder);
        console.log(sentenceHiddenWord + "\n");
        promptUserForAnswer();
    });
});
