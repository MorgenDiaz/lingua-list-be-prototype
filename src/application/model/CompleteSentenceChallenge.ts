import { GeneratedSentenceForWord } from "./GeneratedSentenceForWord";

export class CompleteSentenceChallenge {
  readonly word: string;
  private _sentence: string;
  readonly definition: string;

  constructor(word: string, sentence: string, definition: string) {
    this.word = word;
    this._sentence = sentence;
    this.definition = definition;
  }

  obstructVocabWordInSentence = () => {
    let { word, _sentence } = this;

    const wordPlaceHolder: string = new Array(word.length).fill("*").join("");

    this._sentence = _sentence.replace(word, wordPlaceHolder);
  };

  get sentence(): string {
    return this._sentence;
  }
}
