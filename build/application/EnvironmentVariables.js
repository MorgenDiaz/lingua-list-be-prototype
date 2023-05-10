"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentVariables = void 0;
class EnvironmentVariables {
    constructor() {
        const openAiKey = process.env.OPEN_AI_API_KEY;
        const port = process.env.PORT;
        const databasePassword = process.env.DATABASE_PASSWORD;
        const databaseHost = process.env.DATABASE_HOST;
        const maxGeneratedSentencesPerWord = process.env.MAX_GENERATED_SENTENCES_PER_WORD;
        if (!openAiKey)
            throw Error("An openAI api key is required. Please add your api key to your environment variables under the property OPEN_AI_API_KEY.");
        if (!databasePassword)
            throw Error("A postgresql database password is required. Please add your database password to your environment variables under the property DATABASE_PASSWORD");
        if (!databaseHost)
            throw Error("A postgresql database host is required. Please add your database host to your environment variables under the property DATABASE_HOST");
        this.OPEN_AI_API_KEY = openAiKey;
        this.PORT = port ? Number.parseInt(port) : 90001;
        this.DATABASE_PASSWORD = databasePassword;
        this.DATABASE_HOST = databaseHost;
        this.MAX_GENERATED_SENTENCES_PER_WORD = maxGeneratedSentencesPerWord
            ? Number(maxGeneratedSentencesPerWord)
            : 0;
    }
}
_a = EnvironmentVariables;
EnvironmentVariables.getInstance = () => {
    if (!_a.instance) {
        _a.instance = new EnvironmentVariables();
    }
    return _a.instance;
};
exports.EnvironmentVariables = EnvironmentVariables;
