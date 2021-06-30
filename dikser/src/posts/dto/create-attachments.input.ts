import { Field, InputType } from '@nestjs/graphql'
import { ArrayNotEmpty, IsIn, IsOptional } from 'class-validator'

@InputType()
export class CreateAttachmentInput {
	@Field()
	@IsIn(['image', 'video', 'audio'])
	@IsOptional()
	type: string

	@Field((_) => [String])
	@IsOptional()
	@ArrayNotEmpty()
	uri: string[]
}
