import { BadRequestException } from '@nestjs/common'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/entities/user.entity'
import { AddUserABadgeInput } from './dto/adduser-badge.input'
import { DeleteBadgeResponse } from './dto/badge-delete.dto'
import { CreateBadgeInput } from './dto/create-badge.input'
import { Badge } from './entities/badge.entity'

@Injectable()
export class BadgesService {
	constructor(
		@InjectRepository(Badge)
		private readonly badgesRepository: Repository<Badge>,
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>
	) {}

	async create(createBadgeInput: CreateBadgeInput) {
		/**
		 * Check if badge already exist
		 * If there is already exist badge in database,
		 * Skip the mutations and throw error
		 */
		const isAvailable = await this.badgesRepository.findOne({
			where: {
				label: createBadgeInput.label,
			},
		})

		if (isAvailable)
			throw new BadRequestException(
				`Badge already available with the name of "${isAvailable.label}"`
			)

		const createdBadge = this.badgesRepository.create(createBadgeInput)
		return await this.badgesRepository.save(createdBadge)
	}

	async addUserABadge(addUserABadgeInput: AddUserABadgeInput) {
		// Get target user from database
		const targetUser = await this.usersRepository.findOne(
			addUserABadgeInput.userId
		)

		// Get target badge from database
		const targetBadge = await this.badgesRepository.findOne({
			where: {
				label: addUserABadgeInput.badgeLabel,
			},
		})

		// If there is no either badge or user throw Exception
		if (!targetUser || !targetBadge) throw new NotFoundException()

		// Set badge to user entity
		targetUser.badges = [targetBadge]

		// save to database and return back the data
		return await this.usersRepository.save(targetUser)
	}

	async findOne(label: string) {
		 return await this.badgesRepository.findOne({
			where: { label: label },
			relations: ['owners'],
		})
	}

	async findAll() {
		return await this.badgesRepository.find({ relations: ['owners'] })
	}

	async remove(label: string) {
		// Get target badge from the database
		const targetBadge = await this.badgesRepository.findOne({
			where: {
				label: label,
			},
		})

		// If there is no corresponding badge, throw Exception
		if (!targetBadge) throw new NotFoundException()

		await this.badgesRepository.delete(targetBadge)
		return new DeleteBadgeResponse(targetBadge, 'DELETED', 200)
	}

	async removeBadgeFromUser(label: string, userId: string) {
		// Get target user from the database
		const targetUser = await this.usersRepository.findOne(userId, {
			relations: ['badges'],
		})

		// Get badge target from the database
		const targetBadge = await this.badgesRepository.findOne({
			where: {
				label: label,
			},
		})

		// If there is no either badge or user, throw new Exception
		if (!targetUser || !targetBadge) throw new NotFoundException()

		// Remove badge from target user entity
		targetUser.badges = targetUser.badges.filter((badges) => {
			badges.id !== targetBadge.id
		})

		// Save and return back the data
		return await this.usersRepository.save(targetUser)
	}
}
