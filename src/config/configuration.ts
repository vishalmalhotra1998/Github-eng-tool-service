import { config } from 'dotenv';
import { IConfig } from './Interface';
config();
const configuration: IConfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URL: process.env.MONGO_URL,
};
Object.freeze(configuration);
export default configuration;
