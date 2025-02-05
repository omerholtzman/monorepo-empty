import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

const env = process.env.NODE_ENV || 'development';

let envFile = '.env';
if (env === 'development') {
  envFile = '.dev.env';
} else if (env === 'test') {
  envFile = '.test.env';
}

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const configSchema = z.object({
  PORT: z.coerce.number().min(1),
});

const config = configSchema.parse({
  PORT: process.env.PORT,
});

export default config;