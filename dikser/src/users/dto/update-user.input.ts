import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, Length } from 'class-validator'

@InputType()
export class UpdateUserInput {
	@Field({ nullable: true })
	@Length(3, 25)
	@IsOptional()
	username?: string

	@Field({ nullable: true })
	@IsOptional()
	fullname?: string

	@Field({ nullable: true })
	bio?: string
}
