import { pool } from ".";
import VocabularyWord from "../application/model/VocabularyWord";
import { VocabularyWordsDataSource } from "../application/model/VocabularyWordsDataSource";

export default class VocabularyWordsAdapter
  implements VocabularyWordsDataSource
{
  getAllVocabularyWords = async (): Promise<VocabularyWord[]> => {
    const client = await pool.connect();

    try {
      const { rows: words } = await client.query(`SELECT * FROM vocabulary`);
      return words;
    } catch (error) {
      console.error("There was an error retrieving vocabulary words.");
    } finally {
      client.release();
    }

    return [];
  };

  getSentencesForVocabularyWord = async (wordId: Number): Promise<string[]> => {
    const client = await pool.connect();
    const selectQuery = `
      SELECT * FROM sentences
      WHERE vocabulary_id = $1
    `;
    try {
      const { rows } = await client.query(selectQuery, [wordId]);

      return rows.map((row) => row.sentence);
    } catch (error) {
      console.error("There was an error retrieving sentences for word.");
    } finally {
      client.release();
    }

    return [];
  };

  insertSentenceForVocabularyWord = async (
    sentence: string,
    wordId: Number
  ): Promise<Number> => {
    const client = await pool.connect();

    const insertQuery = `
      INSERT INTO sentences(vocabulary_id, sentence)
      VALUES($1, $2)
      RETURNING id
    `;

    try {
      const {
        rows: [id],
      } = await client.query(insertQuery, [wordId, sentence]);

      return id;
    } catch (error) {
      console.error(
        "There was an error inserting the vocabulary word sentence."
      );
    } finally {
      client.release();
    }

    return -1;
  };
}
