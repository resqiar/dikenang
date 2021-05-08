import { Field, ObjectType } from '@nestjs/graphql'
import { Post } from '../entities/post.entity'

@ObjectType()
export class DeletePostResponse {
	constructor(relatedPost: Post, status: string, code: number) {
		this.previous_data = relatedPost
		this.status = status
		this.code = code
	}

	@Field()
	previous_data: Post

	@Field()
	status: string

	@Field()
	code: number
}
