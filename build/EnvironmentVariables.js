"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentVariables = void 0;
class EnvironmentVariables {
    constructor() {
        const openAiKey = process.env.OPEN_AI_API_KEY;
        const port = process.env.PORT;
        const databasePassword = process.env.DATABASE_PASSWORD;
        if (!openAiKey)
            throw Error("An openAI api key is required. Please add your api key to your .env file");
        if (!databasePassword)
            throw Error("A postgresql database password is required. Please add your database password to your .env file");
        this.OPEN_AI_API_KEY = openAiKey;
        this.PORT = port ? Number.parseInt(port) : 90001;
        this.DATABASE_PASSWORD = databasePassword;
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
