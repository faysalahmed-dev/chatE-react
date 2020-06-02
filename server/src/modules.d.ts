declare namespace NodeJS {
   export interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      HOST: string;
      DB_URL: string;
      DB_NAME?: string;
      PORT: string;
   }
}
