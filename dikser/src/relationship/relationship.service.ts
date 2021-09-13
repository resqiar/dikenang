import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { CreateRelationshipInput } from './dto/create-relationship.input'
import { DeleteRelationshipResponse } from './dto/delete-relationship.dto'
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
		if (currentUser.relationship?.id)
			throw new BadRequestException('You already have a relationship')

		// if there is no target, throw an error
		if (!partnerTarget) throw new NotFoundException()

		// if target already has relationship, throw an error
		if (partnerTarget.relationship?.id)
			throw new BadRequestException('Target already has relationship')

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

	async delete(userId: string) {
		const currentUser = await this.usersService.findById(userId)

		// if there is no relationship
		if (!currentUser.relationship)
			throw new BadRequestException(
				"You don't have relationship just yet"
			)

		// track previous relationship
		const previousRelationship = await this.findById(
			currentUser.relationship.id
		)

		// delete relationship from database
		await this.relationshipRepository.delete(previousRelationship.id)

		/**
		 * Return formatted delete result
		 * Which is highly customizeable response
		 * @see delete-relationship.dto.ts
		 */
		return new DeleteRelationshipResponse(
			previousRelationship,
			'DELETED',
			200
		)
	}

	async findById(relationshipId: string) {
		try {
			return await this.relationshipRepository.findOneOrFail(
				relationshipId,
				{
					relations: ['partnership'],
				}
			)
		} catch (e) {
			/**
			 * @Error here means that client fails to get
			 * correct data from the database/data not found
			 */
			throw new NotFoundException()
		}
	}

	async getMyRelationship(user: User) {
		const targetUser = await this.usersService.findById(user.id)
		if (!targetUser || !targetUser.relationship)
			throw new NotFoundException()
		return await this.findById(targetUser.relationship.id)
	}
}
