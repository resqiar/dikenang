import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsUUID } from 'class-validator'

@InputType()
export class CreateCommentInput {
	@Field()
	@IsString()
	text: string

	@Field()
	@IsUUID()
	postId: string
}
