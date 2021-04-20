import { InputType, Int, Field } from '@nestjs/graphql'
import { IsString, IsUUID } from 'class-validator'

@InputType()
export class CreatePostInput {
	@Field()
	@IsString()
	caption: string

	@Field()
	@IsUUID('all')
	author_id: string
}
