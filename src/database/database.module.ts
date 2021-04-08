import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

/**
 * @Database host URI
 */
const DB_HOST = process.env.DB_HOST

@Module({
	imports: [
		MongooseModule.forRoot(DB_HOST, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
		}),
	],
})
export class DatabaseModule {}
