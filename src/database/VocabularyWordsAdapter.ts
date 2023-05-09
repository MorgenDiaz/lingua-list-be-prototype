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
}
