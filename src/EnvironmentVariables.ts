export class EnvironmentVariables {
  private static instance: EnvironmentVariables;

  readonly PORT: Number;
  readonly OPEN_AI_API_KEY: string;
  readonly DATABASE_PASSWORD: string;

  private constructor() {
    const openAiKey = process.env.OPEN_AI_API_KEY;
    const port = process.env.PORT;
    const databasePassword = process.env.DATABASE_PASSWORD;

    if (!openAiKey)
      throw Error(
        "An openAI api key is required. Please add your api key to your .env file"
      );
    if (!databasePassword)
      throw Error(
        "A postgresql database password is required. Please add your database password to your .env file"
      );

    this.OPEN_AI_API_KEY = openAiKey;
    this.PORT = port ? Number.parseInt(port) : 90001;
    this.DATABASE_PASSWORD = databasePassword;
  }

  static getInstance = () => {
    if (!this.instance) {
      this.instance = new EnvironmentVariables();
    }

    return this.instance;
  };
}
