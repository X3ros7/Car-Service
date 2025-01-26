import { registerAs } from '@nestjs/config';
import { env } from 'node:process';

export default registerAs('db', () => ({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: parseInt(env.DATABASE_PORT, 10) || 5432,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  debug: false,
}));
