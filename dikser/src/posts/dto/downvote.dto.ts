import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from '../../users/entities/user.entity'

@ObjectType()
export class DownvoteDTO {
	constructor(postId: string, downvotes: number, downvoters: User[]) {
		this.postId = postId
		this.downvotes = downvotes
		this.downvoters = downvoters
	}

	@Field()
	postId: string

	@Field(() => Int)
	downvotes: number

	@Field(() => [User])
	downvoters: User[]
}
