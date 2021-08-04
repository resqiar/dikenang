import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Comment } from '../entities/comment.entity'

@ObjectType()
export class CommentsDTO {
	constructor(postId: string, comment: Comment, commentsSum: number) {
		this.postId = postId
		this.comment = comment
		this.commentsSum = commentsSum
	}

	@Field()
	postId: string

	@Field(() => Comment)
	comment: Comment

	@Field(() => Int, { nullable: true })
	commentsSum: number
}
