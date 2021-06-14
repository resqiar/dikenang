import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const config: PostgresConnectionOptions = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	entities: ['dist/**/*.entity{.ts,.js}'],

	// synchronization should set to false when it comes to production
	synchronize: true,

	subscribers: ['dist/subscribers/*.js'],

	// Allow both start:prod and start:dev to use migrations
	// __dirname is either dist or src folder, meaning either
	// the compiled js in prod or the ts in dev.
	migrations: ['dist/database/migrations/**/*.js'],
	cli: {
		// Location of migration should be inside src folder
		// to be compiled into dist/ folder.
		migrationsDir: 'src/database/migrations',
	},
}

export = config
