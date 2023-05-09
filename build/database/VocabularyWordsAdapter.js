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
const _1 = require(".");
class VocabularyWordsAdapter {
    constructor() {
        this.getAllVocabularyWords = () => __awaiter(this, void 0, void 0, function* () {
            const client = yield _1.pool.connect();
            try {
                const { rows: words } = yield client.query(`SELECT * FROM vocabulary`);
                return words;
            }
            catch (error) {
                console.error("There was an error retrieving vocabulary words.");
            }
            finally {
                client.release();
            }
            return [];
        });
    }
}
exports.default = VocabularyWordsAdapter;
