import { CreatePostInput } from './create-post.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { IsUUID } from 'class-validator'

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
	@Field()
	@IsUUID('all')
	id: string
}
