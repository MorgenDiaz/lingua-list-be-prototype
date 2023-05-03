"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const EnvironmentVariables_1 = require("../EnvironmentVariables");
const pool = new pg_1.Pool({
    user: "morgendiaz",
    host: "http://localhost",
    database: "lingualist",
    password: EnvironmentVariables_1.EnvironmentVariables.getInstance().DATABASE_PASSWORD,
});
