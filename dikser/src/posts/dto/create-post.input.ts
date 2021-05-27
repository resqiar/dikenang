import { InputType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class CreatePostInput {
	@Field()
	@IsString()
	caption: string
}
