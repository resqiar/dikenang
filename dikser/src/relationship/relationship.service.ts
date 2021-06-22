import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { CreateRelationshipInput } from './dto/create-relationship.input'
import { Relationship } from './entities/relationship.entity'

@Injectable()
export class RelationshipService {
	constructor(
		@InjectRepository(Relationship)
		private readonly relationshipRepository: Repository<Relationship>,
		private readonly usersService: UsersService
	) {}

	async create(
		userId: string,
		createRelationshipInput: CreateRelationshipInput
	) {
		/**
		 * @Usage Search for currentUser and relationship target
		 * validate everything, create and bind afterwards.
		 */
		const currentUser = await this.usersService.findById(userId)
		const partnerTarget = await this.usersService.findById(
			createRelationshipInput.target
		)

		// if current user already has relationship, throw an error
		if (currentUser.relationship.id)
			throw new BadRequestException('you already has a relationship')

		// if there is no target, throw an error
		if (!partnerTarget) throw new NotFoundException('no target found')

		// if target already has relationship, throw an error
		if (partnerTarget.relationship.id)
			throw new BadRequestException('target already has relationship')

		// create relationship if everything confirmed
		const createdRelationship = this.relationshipRepository.create({
			type: createRelationshipInput.type,
			description: createRelationshipInput.description,
		})
		// link database relation
		createdRelationship.partnership = [currentUser, partnerTarget]

		// return back data successfully
		return await this.relationshipRepository.save(createdRelationship)
	}
}
