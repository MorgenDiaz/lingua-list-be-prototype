import { pool } from ".";
import { up, down } from "./migration";
import { VOCAB_WORDS } from "../data/VocabWords";

const populateVocabularyWords = async (
  words: { word: string; definition: string }[]
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const insertQuery = `
      INSERT INTO vocabulary (word, definition)
      VALUES($1, $2)
      RETURNING id
    `;

    for (const word of words) {
      const { rows } = await client.query(insertQuery, [
        word.word,
        word.definition,
      ]);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const seed = async () => {
  console.debug("Tearing down database...");
  await down();
  console.debug("Raising up database...");
  await up();
  console.debug("Populating vocabulary words...");
  await populateVocabularyWords(VOCAB_WORDS);
  console.log("Database construction complete.");
};
