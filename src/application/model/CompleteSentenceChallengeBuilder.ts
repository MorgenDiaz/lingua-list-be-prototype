import { Configuration, OpenAIApi } from "openai";
import { CompleteSentenceChallenge } from "./CompleteSentenceChallenge";
import { GeneratedSentenceForWord } from "./GeneratedSentenceForWord";
import { EnvironmentVariables } from "../EnvironmentVariables";

export class CompleteSentenceChallengeBuilder {
  private openai;

  constructor() {
    const API_KEY: string = EnvironmentVariables.getInstance().OPEN_AI_API_KEY;

    const chatConfiguration = new Configuration({
      apiKey: API_KEY,
    });

    this.openai = new OpenAIApi(chatConfiguration);
  }

  buildChallengeFromWord = async (
    word: string
  ): Promise<CompleteSentenceChallenge> => {
    const chatPrompt: string = `Create a sentence incorporating the word ${word}. Return a JSON-encoded response with the following keys:

    - "sentence": The generated sentence that incorporates the word ${word}.
    - "definition": The definition of the word ${word}.
    - "word": The word that was incorporated into the sentence.
    
    If the generated sentence uses a variation of the original word, such as a different tense or form, the "word" key should contain the modified version of the word. It is crucial that the word used in the sentence matches the word sent back in your response.
    `;

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
