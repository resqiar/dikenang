import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Comment } from '../entities/comment.entity'

@ObjectType()
export class CommentsDTO {
	constructor(
		postId: string,
		comment: Comment,
		commentsSum: number,
		type: 'added' | 'removed'
	) {
		this.postId = postId
		this.comment = comment
		this.type = type
		this.commentsSum = commentsSum
	}

	@Field()
	postId: string

	@Field(() => Comment)
	comment: Comment

	@Field()
	type: string

	@Field(() => Int, { nullable: true })
	commentsSum: number
}
