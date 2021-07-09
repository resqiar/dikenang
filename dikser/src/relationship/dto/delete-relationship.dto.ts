import { Field, ObjectType } from '@nestjs/graphql'
import { Relationship } from '../entities/relationship.entity'

@ObjectType()
export class DeleteRelationshipResponse {
	constructor(
		relatedRelationship: Relationship,
		status: string,
		code: number
	) {
		this.previous_data = relatedRelationship
		this.status = status
		this.code = code
	}

	@Field()
	previous_data: Relationship

	@Field()
	status: string

	@Field()
	code: number
}
