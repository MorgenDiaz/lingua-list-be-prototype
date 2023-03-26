require("dotenv").config();
import Readline from "readline";

const figlet = require("figlet");

const vocabWords = require("./data/VocabWords");
import { VocabularyList } from "./model/VocabularyList";
import { SentenceBuilder } from "./model/SentenceBuilder";

const vocabList = new VocabularyList(vocabWords);
const randomVocabWord = vocabList.getRandomWord();
const sentenceBuilder = new SentenceBuilder();

const processUserAnswer = (
  answer: string,
  connection: Readline.Interface
): void => {
  connection.close();

  const isCorrectAnswer = answer.trim().toLowerCase() === randomVocabWord;

  if (isCorrectAnswer) {
    console.log("you chose correctly!");
  } else {
    console.log("Sorry, that was not the correct word. Please, try again!");
    promptUserForAnswer();
  }
};

const promptUserForAnswer = (): void => {
  const readline: Readline.Interface = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question(
    "Please enter the word that best fits the sentence, from you vocabulary list. \n",
    (answer) => {
      processUserAnswer(answer, readline);
    }
  );
};

figlet("LinguaList", async function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }

  console.log(data);

  console.log(
    `Selecting random word from list:
        
    `
  );

  for (const word of vocabWords) {
    console.log(word);
  }

  const sentence: string = await sentenceBuilder.getSentenceForWord(
    randomVocabWord
  );

  const wordPlaceHolder: string = new Array(randomVocabWord.length)
    .fill("*")
    .join("");

  const sentenceHiddenWord: string = sentence.replace(
    randomVocabWord,
    wordPlaceHolder
  );

  console.log(sentenceHiddenWord + "\n");

  promptUserForAnswer();
});
