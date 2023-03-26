require("dotenv").config();
import Readline from "readline";
import { CompleteSentenceChallenge } from "./model/CompleteSentenceChallenge";
import { CompleteSentenceChallengeBuilder } from "./model/CompleteSentenceChallengeBuilder";

const figlet = require("figlet");

const vocabWords = require("./data/VocabWords");
import { VocabularyList } from "./model/VocabularyList";

const vocabList = new VocabularyList(vocabWords);
const randomVocabWord = vocabList.getRandomWord();
const completeSentenceChallengeBuilder = new CompleteSentenceChallengeBuilder();

const processUserAnswer = (
  answer: string,
  connection: Readline.Interface,
  challenge: CompleteSentenceChallenge
): void => {
  connection.close();

  const isCorrectAnswer = answer.trim().toLowerCase() === randomVocabWord;

  if (isCorrectAnswer) {
    const { word, definition } = challenge;
    console.log(
      `You chose correctly! The word ${word} fits the sentence perfectly.`
    );
    console.log(`${word}:
        ${definition}
    `);
  } else {
    console.log("Sorry, that was not the correct word. Please, try again!");
    promptUserForAnswer(challenge);
  }
};

const promptUserForAnswer = (challenge: CompleteSentenceChallenge): void => {
  const readline: Readline.Interface = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question(
    "Please enter the word that best fits the sentence, from you vocabulary list. \n",
    (answer) => {
      processUserAnswer(answer, readline, challenge);
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

  const completeSentenceChallenge: CompleteSentenceChallenge =
    await completeSentenceChallengeBuilder.buildChallengeFromWord(
      randomVocabWord
    );

  console.log(completeSentenceChallenge.sentence + "\n");

  promptUserForAnswer(completeSentenceChallenge);
});
