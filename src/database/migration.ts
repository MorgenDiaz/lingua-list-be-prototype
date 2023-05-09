import { pool } from ".";

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
        CREATE TABLE vocabulary (
          id SERIAL PRIMARY KEY,
          word VARCHAR(255) NOT NULL UNIQUE,
          definition TEXT NOT NULL
        );
      `);

    await client.query(`
        CREATE TABLE sentences (
          id SERIAL PRIMARY KEY,
          sentence TEXT NOT NULL,
          vocabulary_id INTEGER NOT NULL REFERENCES vocabulary(id),
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
      `);
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query("DROP TABLE IF EXISTS sentences;");
    await client.query("DROP TABLE IF EXISTS vocabulary;");
  } finally {
    client.release();
  }
};
