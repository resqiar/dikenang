import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsUUID } from 'class-validator'

@InputType()
export class AddUserABadgeInput {
	@Field()
	@IsUUID('all')
	userId: string

	@Field()
	@IsString()
	badgeLabel: string
}
