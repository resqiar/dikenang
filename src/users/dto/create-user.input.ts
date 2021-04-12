import { InputType, Field } from '@nestjs/graphql'
import {
	IsAlphanumeric,
	IsEmail,
	IsOptional,
	IsUrl,
	Length,
} from 'class-validator'

@InputType()
export class CreateUserInput {
	@Field()
	@Length(3, 15)
	@IsAlphanumeric()
	username: string

	@Field()
	@IsEmail()
	email: string

	@Field()
	password: string

	@Field({ nullable: true })
	@IsOptional()
	@IsUrl()
	avatar_url: string
}
