import VocabularyWord from "./VocabularyWord";

export interface VocabularyWordsDataSource {
  getAllVocabularyWords(): Promise<VocabularyWord[]>;
  getSentencesForVocabularyWord(wordId: Number): Promise<string[]>;
  insertSentenceForVocabularyWord(
    sentence: string,
    wordId: Number
  ): Promise<Number>;
}
