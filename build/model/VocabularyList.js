"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyList = void 0;
class VocabularyList {
    constructor(words) {
        this.words = words;
        this.getRandomWord = () => {
            const words = this.words;
            const randomIndex = Math.floor(Math.random() * words.length);
            return words[randomIndex];
        };
    }
}
exports.VocabularyList = VocabularyList;
