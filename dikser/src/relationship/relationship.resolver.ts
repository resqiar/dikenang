import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthStatusGuard } from '../auth/guards/auth.guard'
import { CurrentUser } from '../shared/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { CreateRelationshipInput } from './dto/create-relationship.input'
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
	) {
		return this.relationshipService.create(
			currentUser.id,
			createRelationshipInput
		)
	}
}
