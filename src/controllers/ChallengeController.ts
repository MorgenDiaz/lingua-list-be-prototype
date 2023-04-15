import { Request, Response } from "express";
import { controller, get } from "./decorators";
import { VOCAB_WORDS } from "../data/VocabWords";
import { CompleteSentenceChallengeBuilder } from "../model/CompleteSentenceChallengeBuilder";
import { CompleteSentenceChallenge } from "../model/CompleteSentenceChallenge";
import { DistinctiveWordListBuilder } from "../model/DistinctiveWordListBuilder";
@controller("/challenge")
export class ChallengeController {
  @get("/word-context-sentence")
  async getWordContextSentence(req: Request, res: Response): Promise<void> {
    const distinctiveWordListBuilder = new DistinctiveWordListBuilder(
      VOCAB_WORDS
    );

    const vocabList = await distinctiveWordListBuilder.build(8);
    const contextWord = vocabList.getRandomWord();

    const completeSentenceChallengeBuilder =
      new CompleteSentenceChallengeBuilder();
    const challenge: CompleteSentenceChallenge =
      await completeSentenceChallengeBuilder.buildChallengeFromWord(
        contextWord
      );

    res.json({ words: vocabList.words, ...challenge });
  }
}
