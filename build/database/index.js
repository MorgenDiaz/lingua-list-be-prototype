"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const EnvironmentVariables_1 = require("../application/EnvironmentVariables");
const environmentVariables = EnvironmentVariables_1.EnvironmentVariables.getInstance();
/*
  The only way I was able to establish an ssl connection to the live database
  was by setting the node-postgress environment variables.
*/
const pool = new pg_1.Pool();
exports.pool = pool;
