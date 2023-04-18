import { Configuration, OpenAIApi } from "openai";
import { CompleteSentenceChallenge } from "./CompleteSentenceChallenge";
import { GeneratedSentenceForWord } from "./GeneratedSentenceForWord";

export class CompleteSentenceChallengeBuilder {
  private openai;

  constructor() {
    const API_KEY: string | undefined = process.env.OPEN_AI_API_KEY;

    if (!API_KEY) {
      throw new Error("error locating api key.");
    }

    const chatConfiguration = new Configuration({
      apiKey: API_KEY,
    });

    this.openai = new OpenAIApi(chatConfiguration);
  }

  buildChallengeFromWord = async (
    word: string
  ): Promise<CompleteSentenceChallenge> => {
    const chatPrompt: string = `create a sentence incorporating the word ${word}. return a json encoded response with the key sentence which contains the generated sentence, the key definition which contains the definition of the word ${word}, and the key word which contains the word you constructed the sentence around. If you modified the original word, be sure to send the modified word in the response instead of the original. It is crucial that the word used in the sentence matches the word sent back in your response.`;

    const options = {
      model: "text-davinci-003",
      prompt: chatPrompt,
      temperature: 0.5,
      max_tokens: 250,
      n: 1,
      stream: false,
    };

    const response = await this.openai.createCompletion(options);
    const { choices } = response.data;

    const generatedSentenceForWord: GeneratedSentenceForWord = JSON.parse(
      choices[0].text || ""
    );

    const completeSentenceChallenge = new CompleteSentenceChallenge(
      generatedSentenceForWord
    );

    return completeSentenceChallenge;
  };
}
