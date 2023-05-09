import VocabularyWord from "./VocabularyWord";

export interface VocabularyWordsDataSource {
  getAllVocabularyWords(): Promise<VocabularyWord[]>;
}
