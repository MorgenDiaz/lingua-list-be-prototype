import { Request, Response } from "express";
import { controller, get } from "./decorators";
import { CompleteSentenceChallengeBuilder } from "../model/CompleteSentenceChallengeBuilder";
import { CompleteSentenceChallenge } from "../model/CompleteSentenceChallenge";
import { DistinctiveWordListBuilder } from "../model/DistinctiveWordListBuilder";
import VocabularyWordsAdapter from "../../database/VocabularyWordsAdapter";
@controller("/challenge")
export class ChallengeController {
  @get("/word-context-sentence")
  async getWordContextSentence(req: Request, res: Response): Promise<void> {
    const vocabularyWords =
      await new VocabularyWordsAdapter().getAllVocabularyWords();

    const distinctiveWordListBuilder = new DistinctiveWordListBuilder(
      vocabularyWords
    );

    const vocabList = await distinctiveWordListBuilder.build(8);
    const contextWord = vocabList.getRandomWord();

    const completeSentenceChallengeBuilder =
      new CompleteSentenceChallengeBuilder();
    const challenge: CompleteSentenceChallenge =
      await completeSentenceChallengeBuilder.buildChallengeFromWord(
        contextWord.word
      );

    res.json({ words: vocabList.words, ...challenge });
  }
}
