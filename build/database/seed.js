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
exports.seed = void 0;
const _1 = require(".");
const migration_1 = require("./migration");
const VocabWords_1 = require("../data/VocabWords");
const populateVocabularyWords = (words) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield _1.pool.connect();
    try {
        yield client.query("BEGIN");
        const insertQuery = `
      INSERT INTO vocabulary (word, definition)
      VALUES($1, $2)
      RETURNING id
    `;
        for (const word of words) {
            const { rows } = yield client.query(insertQuery, [
                word.word,
                word.definition,
            ]);
        }
        yield client.query("COMMIT");
    }
    catch (error) {
        yield client.query("ROLLBACK");
        throw error;
    }
    finally {
        client.release();
    }
});
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    console.debug("Tearing down database...");
    yield (0, migration_1.down)();
    console.debug("Raising up database...");
    yield (0, migration_1.up)();
    console.debug("Populating vocabulary words...");
    yield populateVocabularyWords(VocabWords_1.VOCAB_WORDS);
    console.log("Database construction complete.");
});
exports.seed = seed;
