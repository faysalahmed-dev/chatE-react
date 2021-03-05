declare namespace NodeJS {
   export interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      HOST: string;
      DB_URL: string;
      DB_PASS: string;
      DB_NAME?: string;
      PORT: string;
      JWT_PRIVATE_KEY: string;
   }
}
