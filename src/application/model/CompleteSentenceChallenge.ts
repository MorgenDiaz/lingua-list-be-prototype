import { GeneratedSentenceForWord } from "./GeneratedSentenceForWord";

export class CompleteSentenceChallenge {
  word: string;
  sentence: string;
  definition: string;

  constructor(generatedSentenceForWord: GeneratedSentenceForWord) {
    this.word = generatedSentenceForWord.word;
    this.sentence = generatedSentenceForWord.sentence;
    this.definition = generatedSentenceForWord.definition;

    this.obstructVocabWordInSentence();
  }

  private obstructVocabWordInSentence = () => {
    let { word, sentence } = this;

    const wordPlaceHolder: string = new Array(word.length).fill("*").join("");

    this.sentence = sentence.replace(word, wordPlaceHolder);
  };
}
