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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeController = void 0;
const controller_1 = require("./decorators/controller");
const routes_1 = require("./decorators/routes");
const VocabularyList_1 = require("../model/VocabularyList");
const VocabWords_1 = require("../data/VocabWords");
const CompleteSentenceChallengeBuilder_1 = require("../model/CompleteSentenceChallengeBuilder");
let ChallengeController = class ChallengeController {
    getWordContextSentence(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vocabList = new VocabularyList_1.VocabularyList(VocabWords_1.VOCAB_WORDS);
            const contextWord = vocabList.getRandomWord();
            const completeSentenceChallengeBuilder = new CompleteSentenceChallengeBuilder_1.CompleteSentenceChallengeBuilder();
            const challenge = yield completeSentenceChallengeBuilder.buildChallengeFromWord(contextWord);
            res.json(challenge);
        });
    }
};
__decorate([
    (0, routes_1.get)("/word-context-sentence"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChallengeController.prototype, "getWordContextSentence", null);
ChallengeController = __decorate([
    (0, controller_1.controller)("/challenge")
], ChallengeController);
exports.ChallengeController = ChallengeController;