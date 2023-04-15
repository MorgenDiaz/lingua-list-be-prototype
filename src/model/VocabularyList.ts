export class VocabularyList {
  constructor(private _words: string[]) {}

  getRandomWord = (): string => {
    const _words = this._words;
    const randomIndex = Math.floor(Math.random() * _words.length);
    return _words[randomIndex];
  };

  get words() {
    return this._words;
  }
}
