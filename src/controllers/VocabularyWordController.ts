import { Request, Response } from "express";
import { controller, get } from "./decorators";
import { VOCAB_WORDS } from "../data/VocabWords";

@controller("/vocabulary-word")
export class VocabularyWordController {
  @get("/")
  getVocabularyWords(req: Request, res: Response): void {
    res.json(VOCAB_WORDS);
  }
}
