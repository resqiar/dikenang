import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateAttachmentInput {
	@Field()
	type: string

	@Field()
	extensions: string

	@Field((type) => [String])
	uri: string[]
}
