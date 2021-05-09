import * as dotenv from 'dotenv'
dotenv.config()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	/**
	 * @Use global validation pipes
	 * to takes advantage of validation pipe
	 * in DTO module file extensions
	 */
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(3000)
}
bootstrap()
