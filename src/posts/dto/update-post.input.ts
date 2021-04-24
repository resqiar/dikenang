import { CreatePostInput } from './create-post.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { IsString, IsUUID } from 'class-validator'

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
	@Field()
	@IsUUID('all')
	id: string
}
