import { Request, Response } from "express";
import { controller, get } from "./decorators";
import VocabularyWordsAdapter from "../../database/VocabularyWordsAdapter";

@controller("/vocabulary-word")
export class VocabularyWordController {
  @get("/")
  async getVocabularyWords(req: Request, res: Response): Promise<void> {
    const vocabularyWords =
      await new VocabularyWordsAdapter().getAllVocabularyWords();
    res.json(vocabularyWords);
  }
}
