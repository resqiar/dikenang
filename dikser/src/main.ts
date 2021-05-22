import * as dotenv from 'dotenv'
dotenv.config()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import * as passport from 'passport'
import * as redis from 'redis'
import * as connectRedis from 'connect-redis'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	/**
	 * @Use global validation pipes
	 * to takes advantage of validation pipe
	 * in DTO module file extensions
	 */
	app.useGlobalPipes(new ValidationPipe())
	app.enableCors({
		origin: [process.env.CLIENT_ORIGIN || 'http://localhost:3001'],
		credentials: true,
	})

	// Redis config
	const redisClient = redis.createClient({ url: process.env.REDIS_URI })
	const RedisStore = connectRedis(session)

	// Express session config
	app.use(
		session({
			cookie: {
				maxAge: 86400000, // 1 day
			},
			secret: process.env.SESSION_KEY!,
			resave: false,
			saveUninitialized: false,
			store: new RedisStore({
				client: redisClient,
			}),
		})
	)
	app.use(passport.initialize())
	app.use(passport.session())

	await app.listen(process.env.PORT || 3000)
}
bootstrap()
