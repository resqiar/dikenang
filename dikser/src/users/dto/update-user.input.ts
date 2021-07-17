import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsUrl, Length } from 'class-validator'

@InputType()
export class UpdateUserInput {
	@Field({ nullable: true })
	@Length(3, 15)
	@IsOptional()
	username?: string

	@Field({ nullable: true })
	@IsEmail()
	@IsOptional()
	email?: string

	@Field({ nullable: true })
	bio?: string

	@Field({ nullable: true })
	@IsUrl()
	@IsOptional()
	avatar_url?: string
}
