import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsUUID } from 'class-validator'

@InputType()
export class CreateRelationshipInput {
	@Field()
	@IsString()
	type: string

	@Field()
	@IsString()
	description: string

	@Field()
	@IsUUID('all')
	target: string
}
