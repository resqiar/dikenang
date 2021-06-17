import * as dotenv from 'dotenv'
dotenv.config()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import * as passport from 'passport'
import * as redis from 'redis'
import * as connectRedis from 'connect-redis'
import { Client } from 'connect-redis'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	/**
	 * @Use global validation pipes
	 * to takes advantage of validation pipe
	 * in DTO module file extensions
	 */
	app.useGlobalPipes(new ValidationPipe())
	app.enableCors({
		origin: [process.env.CLIENT_ORIGIN!, 'http://localhost:3001'],
		credentials: true,
	})

	// Redis config
	const REDIS_URI = process.env.REDIS_URL || 'redis://localhost'
	const redisClient = redis.createClient({ url: REDIS_URI })
	const RedisStore = connectRedis(session)

	// Express session config
	app.use(
		session({
			cookie: {
				maxAge: 86400000, // 1 day
				secure: process.env.NODE_ENV === 'production', // transmit only over https
				httpOnly: true, // prevent client JS reading the cookie
				sameSite:
					process.env.NODE_ENV === 'production' ? 'none' : 'lax',
			},
			secret: process.env.SESSION_KEY!,
			resave: false,
			saveUninitialized: false,
			store: new RedisStore({
				client: redisClient as Client,
			}),
		})
	)
	app.use(passport.initialize())
	app.use(passport.session())

	await app.listen(process.env.PORT || 3000)
}
bootstrap()
