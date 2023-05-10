export default class VocabularyWord {
  readonly id: Number;
  readonly word: string;
  readonly definition: string;

  constructor(id: Number, word: string, definition: string) {
    this.id = id;
    this.word = word;
    this.definition = definition;
  }
}
