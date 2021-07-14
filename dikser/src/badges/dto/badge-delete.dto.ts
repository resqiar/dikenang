import { Field, ObjectType } from '@nestjs/graphql'
import { Badge } from '../entities/badge.entity'

@ObjectType()
export class DeleteBadgeResponse {
	constructor(relatedPost: Badge, status: string, code: number) {
		this.previous_data = relatedPost
		this.status = status
		this.code = code
	}

	@Field()
	previous_data: Badge

	@Field()
	status: string

	@Field()
	code: number
}
