import { InputType, Field } from '@nestjs/graphql'
import { IsIn, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateBadgeInput {
	@Field()
	@IsString()
	label: string

	@Field({ nullable: true })
	@IsIn(['default', 'outlined'])
	variant: string

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	color: string

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	background: string

	@Field({ nullable: true })
	@IsString()
	@IsOptional()
	border: string
}
