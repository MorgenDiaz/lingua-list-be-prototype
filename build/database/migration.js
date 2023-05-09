"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const _1 = require(".");
const up = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield _1.pool.connect();
    try {
        yield client.query(`
        CREATE TABLE vocabulary (
          id SERIAL PRIMARY KEY,
          word VARCHAR(255) NOT NULL UNIQUE,
          definition TEXT NOT NULL
        );
      `);
        yield client.query(`
        CREATE TABLE sentences (
          id SERIAL PRIMARY KEY,
          sentence TEXT NOT NULL,
          vocabulary_id INTEGER NOT NULL REFERENCES vocabulary(id),
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
      `);
    }
    finally {
        client.release();
    }
});
exports.up = up;
const down = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield _1.pool.connect();
    try {
        yield client.query("DROP TABLE IF EXISTS sentences;");
        yield client.query("DROP TABLE IF EXISTS vocabulary;");
    }
    finally {
        client.release();
    }
});
exports.down = down;
