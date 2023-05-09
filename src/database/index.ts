import { Pool } from "pg";
import { EnvironmentVariables } from "../application/EnvironmentVariables";

const pool = new Pool({
  user: "morgendiaz",
  host: EnvironmentVariables.getInstance().DATABASE_HOST,
  database: "lingualist",
  password: EnvironmentVariables.getInstance().DATABASE_PASSWORD,
});

export { pool };
