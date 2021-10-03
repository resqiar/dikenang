import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserAttachment {
	@Field(() => Int)
	publics: number

	@Field(() => Int)
	folls: number

	@Field(() => Int)
	upvotes: number

	@Field(() => Boolean)
	relationship: boolean
}
