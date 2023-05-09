export default class VocabularyWord {
  readonly word: string;
  readonly definition: string;

  constructor(word: string, definition: string) {
    this.word = word;
    this.definition = definition;
  }
}
