export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number;
      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      MAIL_HOST: string;
      MAIL_PORT: number;
      MAIL_USER: string;
      MAIL_PASS: string;
      MAIL_FROM: string;
    }
  }
}
