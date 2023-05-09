"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const EnvironmentVariables_1 = require("../application/EnvironmentVariables");
const pool = new pg_1.Pool({
    user: "morgendiaz",
    host: EnvironmentVariables_1.EnvironmentVariables.getInstance().DATABASE_HOST,
    database: "lingualist",
    password: EnvironmentVariables_1.EnvironmentVariables.getInstance().DATABASE_PASSWORD,
});
exports.pool = pool;
