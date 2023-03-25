require("dotenv").config();
import { Configuration, OpenAIApi } from "openai";
const vocabWords = require("./data/VocabWords");
import { VocabularyList } from "./model/VocabularyList";

const API_KEY: string | undefined = process.env.OPEN_AI_API_KEY;

if (!API_KEY) {
  throw new Error("error locating api key.");
}

const chatConfiguration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(chatConfiguration);

const vocabList = new VocabularyList(vocabWords);
const randomVocabWord = vocabList.getRandomWord();

console.log(randomVocabWord);

const chatPrompt: string = `could you create a sentence incorporating the word ${randomVocabWord} or variations of ${randomVocabWord}.`;
const options = {
  model: "text-davinci-003",
  prompt: chatPrompt,
  temperature: 0.5,
  max_tokens: 200,
  n: 1,
  stream: false,
};

const promptAi = async (): Promise<void> => {
  const response = await openai.createCompletion(options);
  const { choices } = response.data;

  console.log(choices[0].text);
};

promptAi();
