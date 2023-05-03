import { Pool } from "pg";
import { EnvironmentVariables } from "../EnvironmentVariables";

const pool = new Pool({
  user: "morgendiaz",
  host: "http://localhost",
  database: "lingualist",
  password: EnvironmentVariables.getInstance().DATABASE_PASSWORD,
});
