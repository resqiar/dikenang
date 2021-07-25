import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from '../../users/entities/user.entity'

@ObjectType()
export class UpvoteDTO {
	constructor(postId: string, upvotes: number, upvoters: User[]) {
		this.postId = postId
		this.upvotes = upvotes
		this.upvoters = upvoters
	}

	@Field()
	postId: string

	@Field(() => Int)
	upvotes: number

	@Field(() => [User])
	upvoters: User[]
}
