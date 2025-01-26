import { config as dotenvConfig } from 'dotenv'

dotenvConfig({ path: '.env' })
// dotenvConfig({ path: '.env.example'})

export default {
	type: 'postgres',
	host: `${process.env.DATABASE_HOST}` || 'localhost',
	port: `${process.env.DATABASE_PORT}`,
	username: `${process.env.DATABASE_USERNAME}`,
	password: `${process.env.DATABASE_PASSWORD}`,
	database: `${process.env.DATABASE_NAME}`,
	migrations: ['database/migrations/*{.ts,.js}'],
	// autoLoadEntities: true,
	// synchronize: true,
}
