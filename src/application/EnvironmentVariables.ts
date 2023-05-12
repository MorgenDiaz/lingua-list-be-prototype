import dotenv from "dotenv";
import { env } from "process";
export class EnvironmentVariables {
  private static instance: EnvironmentVariables;

  readonly PORT: Number;
  readonly OPEN_AI_API_KEY: string;
  readonly MAX_GENERATED_SENTENCES_PER_WORD: number;

  private constructor() {
    dotenv.config();
    const openAiKey = env.OPEN_AI_API_KEY;
    const port = env.PORT;
    const maxGeneratedSentencesPerWord = env.MAX_GENERATED_SENTENCES_PER_WORD;

    if (!openAiKey) {
      console.error(
        "An openAI api key is required. Please add your api key to your environment variables under the property OPEN_AI_API_KEY."
      );
      this.OPEN_AI_API_KEY = "missing-key";
    } else {
      this.OPEN_AI_API_KEY = openAiKey;
    }

    this.PORT = port ? Number.parseInt(port) : 90001;

    this.MAX_GENERATED_SENTENCES_PER_WORD = maxGeneratedSentencesPerWord
      ? Number(maxGeneratedSentencesPerWord)
      : 0;
  }

  static getInstance = () => {
    if (!this.instance) {
      this.instance = new EnvironmentVariables();
    }

    return this.instance;
  };
}
