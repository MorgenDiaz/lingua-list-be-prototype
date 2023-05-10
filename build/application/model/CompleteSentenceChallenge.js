"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteSentenceChallenge = void 0;
class CompleteSentenceChallenge {
    constructor(word, sentence, definition) {
        this.obstructVocabWordInSentence = () => {
            let { word, _sentence } = this;
            const wordPlaceHolder = new Array(word.length).fill("*").join("");
            this._sentence = _sentence.replace(word, wordPlaceHolder);
        };
        this.word = word;
        this._sentence = sentence;
        this.definition = definition;
    }
    get sentence() {
        return this._sentence;
    }
}
exports.CompleteSentenceChallenge = CompleteSentenceChallenge;
