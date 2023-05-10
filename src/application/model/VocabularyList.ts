import VocabularyWord from "./VocabularyWord";

export class VocabularyList {
  readonly words: VocabularyWord[] = [];

  constructor(words: VocabularyWord[]) {
    this.words = words;
  }

  getRandomWord = (): VocabularyWord => {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  };
}
