import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SearchOptions {
	@Field({ nullable: true })
	id: string

	@Field({ nullable: true })
	title: string

	@Field({ nullable: true })
	type: string

	@Field({ nullable: true })
	avatarUrl?: string

	@Field({ nullable: true })
	author?: string
}
