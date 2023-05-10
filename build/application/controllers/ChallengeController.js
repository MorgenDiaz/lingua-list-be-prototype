"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var ChallengeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeController = void 0;
const EnvironmentVariables_1 = require("../EnvironmentVariables");
const decorators_1 = require("./decorators");
const CompleteSentenceChallengeBuilder_1 = require("../model/CompleteSentenceChallengeBuilder");
const CompleteSentenceChallenge_1 = require("../model/CompleteSentenceChallenge");
const DistinctiveWordListBuilder_1 = require("../model/DistinctiveWordListBuilder");
const VocabularyWordsAdapter_1 = __importDefault(require("../../database/VocabularyWordsAdapter"));
let ChallengeController = ChallengeController_1 = class ChallengeController {
    getWordContextSentence(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vocabList = yield ChallengeController_1.getRandomVocabularySublist();
            const contextWord = vocabList.getRandomWord();
            const vocabularyWordsAdapter = new VocabularyWordsAdapter_1.default();
            const wordSentences = yield vocabularyWordsAdapter.getSentencesForVocabularyWord(contextWord.id);
            const completeSentenceChallengeBuilder = new CompleteSentenceChallengeBuilder_1.CompleteSentenceChallengeBuilder();
            let challenge;
            if (wordSentences.length <
                EnvironmentVariables_1.EnvironmentVariables.getInstance().MAX_GENERATED_SENTENCES_PER_WORD) {
                challenge = yield completeSentenceChallengeBuilder.buildChallengeFromWord(contextWord.word);
                vocabularyWordsAdapter.insertSentenceForVocabularyWord(challenge.sentence, contextWord.id);
            }
            else {
                const randomSentenceIndex = Math.floor(Math.random() * wordSentences.length);
                challenge = new CompleteSentenceChallenge_1.CompleteSentenceChallenge(contextWord.word, wordSentences[randomSentenceIndex], contextWord.definition);
            }
            challenge.obstructVocabWordInSentence();
            res.json({
                words: vocabList.words.map((wordData) => wordData.word),
                word: challenge.word,
                sentence: challenge.sentence,
                definition: challenge.definition,
            });
        });
    }
};
ChallengeController.getRandomVocabularySublist = () => __awaiter(void 0, void 0, void 0, function* () {
    const vocabularyWords = yield new VocabularyWordsAdapter_1.default().getAllVocabularyWords();
    const distinctiveWordListBuilder = new DistinctiveWordListBuilder_1.DistinctiveWordListBuilder(vocabularyWords);
    const vocabList = yield distinctiveWordListBuilder.build(8);
    return vocabList;
});
__decorate([
    (0, decorators_1.get)("/word-context-sentence"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChallengeController.prototype, "getWordContextSentence", null);
ChallengeController = ChallengeController_1 = __decorate([
    (0, decorators_1.controller)("/challenge")
], ChallengeController);
exports.ChallengeController = ChallengeController;
