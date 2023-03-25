export class VocabularyList {
  constructor(private words: string[]) {}

  getRandomWord = (): string => {
    const words = this.words;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };
}
