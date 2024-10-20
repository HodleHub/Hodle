import dotenvSafe from 'dotenv-safe';
import path from 'path';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root('.env'),
  sample: root('.env.example'),
});

export const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_KEY: process.env.JWT_KEY as string,
  HOST: process.env.HOST
} as const;
