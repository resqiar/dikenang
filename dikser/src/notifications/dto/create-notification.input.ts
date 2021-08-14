import { InputType, Field } from '@nestjs/graphql'
import { IsIn, IsOptional, IsUUID } from 'class-validator'

@InputType()
export class CreateNotificationInput {
	@Field()
	@IsIn(['vote', 'devote', 'comment', 'reply'])
	type: string

	@Field({ nullable: true })
	@IsUUID('all')
	@IsOptional()
	relatedPostId: string
}
