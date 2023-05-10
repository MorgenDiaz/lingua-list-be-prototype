import { Request, Response } from "express";
import { EnvironmentVariables } from "../EnvironmentVariables";
import { controller, get } from "./decorators";
import { CompleteSentenceChallengeBuilder } from "../model/CompleteSentenceChallengeBuilder";
import { CompleteSentenceChallenge } from "../model/CompleteSentenceChallenge";
import { DistinctiveWordListBuilder } from "../model/DistinctiveWordListBuilder";
import VocabularyWordsAdapter from "../../database/VocabularyWordsAdapter";
import { VocabularyList } from "../model/VocabularyList";

@controller("/challenge")
export class ChallengeController {
  private static getRandomVocabularySublist =
    async (): Promise<VocabularyList> => {
      const vocabularyWords =
        await new VocabularyWordsAdapter().getAllVocabularyWords();

      const distinctiveWordListBuilder = new DistinctiveWordListBuilder(
        vocabularyWords
      );

      const vocabList = await distinctiveWordListBuilder.build(8);
      return vocabList;
    };

  @get("/word-context-sentence")
  async getWordContextSentence(req: Request, res: Response): Promise<void> {
    const vocabList = await ChallengeController.getRandomVocabularySublist();

    const contextWord = vocabList.getRandomWord();

    const vocabularyWordsAdapter = new VocabularyWordsAdapter();

    const wordSentences =
      await vocabularyWordsAdapter.getSentencesForVocabularyWord(
        contextWord.id
      );

    const completeSentenceChallengeBuilder =
      new CompleteSentenceChallengeBuilder();

    let challenge: CompleteSentenceChallenge;

    if (
      wordSentences.length <
      EnvironmentVariables.getInstance().MAX_GENERATED_SENTENCES_PER_WORD
    ) {
      challenge = await completeSentenceChallengeBuilder.buildChallengeFromWord(
        contextWord.word
      );

      vocabularyWordsAdapter.insertSentenceForVocabularyWord(
        challenge.sentence,
        contextWord.id
      );
    } else {
      const randomSentenceIndex = Math.floor(
        Math.random() * wordSentences.length
      );

      challenge = new CompleteSentenceChallenge(
        contextWord.word,
        wordSentences[randomSentenceIndex],
        contextWord.definition
      );
    }

    challenge.obstructVocabWordInSentence();
    res.json({
      words: vocabList.words.map((wordData) => wordData.word),
      word: challenge.word,
      sentence: challenge.sentence,
      definition: challenge.definition,
    });
  }
}
