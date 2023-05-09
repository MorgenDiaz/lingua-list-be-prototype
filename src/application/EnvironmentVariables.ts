export class EnvironmentVariables {
  private static instance: EnvironmentVariables;

  readonly PORT: Number;
  readonly OPEN_AI_API_KEY: string;
  readonly DATABASE_PASSWORD: string;
  readonly DATABASE_HOST: string;

  private constructor() {
    const openAiKey = process.env.OPEN_AI_API_KEY;
    const port = process.env.PORT;
    const databasePassword = process.env.DATABASE_PASSWORD;
    const databaseHost = process.env.DATABASE_HOST;

    if (!openAiKey)
      throw Error(
        "An openAI api key is required. Please add your api key to your environment variables under the property OPEN_AI_API_KEY."
      );
    if (!databasePassword)
      throw Error(
        "A postgresql database password is required. Please add your database password to your environment variables under the property DATABASE_PASSWORD"
      );
    if (!databaseHost)
      throw Error(
        "A postgresql database host is required. Please add your database host to your environment variables under the property DATABASE_HOST"
      );

    this.OPEN_AI_API_KEY = openAiKey;
    this.PORT = port ? Number.parseInt(port) : 90001;
    this.DATABASE_PASSWORD = databasePassword;
    this.DATABASE_HOST = databaseHost;
  }

  static getInstance = () => {
    if (!this.instance) {
      this.instance = new EnvironmentVariables();
    }

    return this.instance;
  };
}
