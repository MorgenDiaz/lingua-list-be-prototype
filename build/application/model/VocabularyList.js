"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyList = void 0;
class VocabularyList {
    constructor(words) {
        this.words = [];
        this.getRandomWord = () => {
            const randomIndex = Math.floor(Math.random() * this.words.length);
            return this.words[randomIndex];
        };
        this.words = words;
    }
}
exports.VocabularyList = VocabularyList;
