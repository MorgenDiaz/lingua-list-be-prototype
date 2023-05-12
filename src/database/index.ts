import { Pool } from "pg";
import { EnvironmentVariables } from "../application/EnvironmentVariables";
const environmentVariables = EnvironmentVariables.getInstance();

/*
  The only way I was able to establish an ssl connection to the live database
  was by setting the node-postgress environment variables.
*/

const pool = new Pool();

export { pool };
