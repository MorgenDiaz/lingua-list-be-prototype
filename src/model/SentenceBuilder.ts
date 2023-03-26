import { Configuration, OpenAIApi } from "openai";

export class SentenceBuilder {
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

  getSentenceForWord = async (word: string): Promise<string> => {
    const chatPrompt: string = `could you create a sentence incorporating the word ${word} or variations of ${word}.`;
    const options = {
      model: "text-davinci-003",
      prompt: chatPrompt,
      temperature: 0.5,
      max_tokens: 200,
      n: 1,
      stream: false,
    };

    const response = await this.openai.createCompletion(options);
    const { choices } = response.data;
    const generatedSentence = choices[0].text;
    return generatedSentence ? generatedSentence : "error generating sentence.";
  };
}
