import { Field, InputType } from '@nestjs/graphql'
import { ArrayNotEmpty, IsIn } from 'class-validator'

@InputType()
export class CreateAttachmentInput {
	@Field()
	@IsIn(['image', 'video', 'sound'])
	type: string

	@Field()
	@IsIn(['mp4', 'jpg', 'png', 'gif', 'mp3'])
	extensions: string

	@Field((type) => [String])
	@ArrayNotEmpty()
	uri: string[]
}
