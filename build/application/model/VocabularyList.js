"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyList = void 0;
class VocabularyList {
    constructor(_words) {
        this._words = _words;
        this.getRandomWord = () => {
            const _words = this._words;
            const randomIndex = Math.floor(Math.random() * _words.length);
            return _words[randomIndex];
        };
    }
    get words() {
        return this._words;
    }
}
exports.VocabularyList = VocabularyList;
