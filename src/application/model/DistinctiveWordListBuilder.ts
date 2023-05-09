import { Configuration, OpenAIApi } from "openai";
import { VocabularyList } from "./VocabularyList";

export class DistinctiveWordListBuilder {
  private openai;

  constructor(private words: string[]) {
    const API_KEY: string | undefined = process.env.OPEN_AI_API_KEY;

    if (!API_KEY) {
      throw new Error("error locating api key.");
    }

    const chatConfiguration = new Configuration({
      apiKey: API_KEY,
    });

    this.openai = new OpenAIApi(chatConfiguration);
  }

  build = async (listSize: number): Promise<VocabularyList> => {
    if (listSize < 1)
      throw new Error(
        "Invalid list size. Please provide a list size greater than zero."
      );

    const constrainedListSize = Math.min(this.words.length, listSize);

    const chatPrompt: string = `
        Select ${constrainedListSize} words in random order from the array of words I provide.
        Please ensure that none of the words are synonyms.
        If it is not possible to construct a list of words for the specified length ${constrainedListSize}
        without words of the same meaning, then use as few synonomous words as possible
        when constructing the list. Your response should contain , separated words in a single line.

        Here are the words I would like you to select from.

        ${this.words}
        `;

    const options = {
      model: "text-davinci-003",
      prompt: chatPrompt,
      temperature: 0.8,
      max_tokens: 250,
      n: 1,
      stream: false,
    };

    const response = await this.openai.createCompletion(options);
    const { choices } = response.data;
    const [firstChoice] = choices;

    if (!firstChoice.text) {
      throw new Error("OpenAI failed to generate any list items.");
    }

    const wordList = firstChoice.text.trim().toLowerCase().split(",");

    return new VocabularyList(wordList);
  };
}
