import { Request, Response } from "express";
import { controller, get } from "./decorators";
import { VocabularyList } from "../model/VocabularyList";
import { VOCAB_WORDS } from "../data/VocabWords";
import { CompleteSentenceChallengeBuilder } from "../model/CompleteSentenceChallengeBuilder";
import { CompleteSentenceChallenge } from "../model/CompleteSentenceChallenge";
@controller("/challenge")
export class ChallengeController {
  @get("/word-context-sentence")
  async getWordContextSentence(req: Request, res: Response): Promise<void> {
    const vocabList = new VocabularyList(VOCAB_WORDS);
    const contextWord = vocabList.getRandomWord();
    const completeSentenceChallengeBuilder =
      new CompleteSentenceChallengeBuilder();
    const challenge: CompleteSentenceChallenge =
      await completeSentenceChallengeBuilder.buildChallengeFromWord(
        contextWord
      );

    res.json(challenge);
  }
}
