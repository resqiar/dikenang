import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthStatusGuard } from '../auth/guards/auth.guard'
import { CurrentUser } from '../shared/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { CreateRelationshipInput } from './dto/create-relationship.input'
import { DeleteRelationshipResponse } from './dto/delete-relationship.dto'
import { Relationship } from './entities/relationship.entity'
import { RelationshipService } from './relationship.service'

@Resolver()
export class RelationshipResolver {
	constructor(private readonly relationshipService: RelationshipService) {}

	@Mutation(() => Relationship, { name: 'createRelationship' })
	@UseGuards(AuthStatusGuard)
	async createRelationship(
		@CurrentUser() currentUser: User,
		@Args('createRelationshipInput')
		createRelationshipInput: CreateRelationshipInput
	): Promise<Relationship> {
		return this.relationshipService.create(
			currentUser.id,
			createRelationshipInput
		)
	}

	@Mutation(() => DeleteRelationshipResponse, { name: 'deleteRelationship' })
	@UseGuards(AuthStatusGuard)
	async deleteRelationship(
		@CurrentUser() currentUser: User
	): Promise<DeleteRelationshipResponse> {
		return this.relationshipService.delete(currentUser.id)
	}
}
