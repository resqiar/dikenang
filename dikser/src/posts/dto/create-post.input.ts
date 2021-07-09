import { InputType, Field } from '@nestjs/graphql'
import { IsIn, IsString } from 'class-validator'

@InputType()
export class CreatePostInput {
	@Field()
	@IsString()
	caption: string

	@Field()
	@IsIn(['public', 'private'])
	type: string
}
