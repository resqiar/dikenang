import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { join } from 'path'
import { GraphQLError, GraphQLFormattedError } from 'graphql'

@Module({
	imports: [
		DatabaseModule,
		UsersModule,
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			/**
			 * Intercept graphql error, bind a custom json object
			 * @Example BadRequestException | UnauthorizedException | InvalidRequestException | etc
			 * @returns custom message object for better error handling
			 */
			formatError: (error: GraphQLError) => {
				const graphQLFormattedError: GraphQLFormattedError = {
					message:
						error.extensions?.exception?.response?.message ||
						error.message,
					extensions: {
						error: error.extensions.exception?.response?.error,
						status: error.extensions.exception?.status,
					},
				}
				return graphQLFormattedError
			},
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
