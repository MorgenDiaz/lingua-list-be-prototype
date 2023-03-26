"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteSentenceChallenge = void 0;
class CompleteSentenceChallenge {
    constructor(generatedSentenceForWord) {
        this.obstructVocabWordInSentence = () => {
            let { word, sentence } = this;
            const wordPlaceHolder = new Array(word.length).fill("*").join("");
            this.sentence = sentence.replace(word, wordPlaceHolder);
        };
        this.word = generatedSentenceForWord.word;
        this.sentence = generatedSentenceForWord.sentence;
        this.definition = generatedSentenceForWord.definition;
        this.obstructVocabWordInSentence();
    }
}
exports.CompleteSentenceChallenge = CompleteSentenceChallenge;
