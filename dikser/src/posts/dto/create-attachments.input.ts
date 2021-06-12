import { Field, InputType } from '@nestjs/graphql'
import { ArrayNotEmpty, IsIn, IsOptional } from 'class-validator'

@InputType()
export class CreateAttachmentInput {
	@Field()
	@IsIn(['image', 'video', 'sound'])
	@IsOptional()
	type: string

	@Field()
	@IsOptional()
	@IsIn(['mp4', 'jpg', 'png', 'gif', 'mp3'])
	extensions: string

	@Field((_) => [String])
	@IsOptional()
	@ArrayNotEmpty()
	uri: string[]
}
