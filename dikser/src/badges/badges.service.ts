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
		const createdBadge = this.badgesRepository.create(createBadgeInput)
		return await this.badgesRepository.save(createdBadge)
	}

	async addUserABadge(addUserABadgeInput: AddUserABadgeInput) {
		// get target user
		const targetUser = await this.usersRepository.findOne(
			addUserABadgeInput.userId
		)
		// get target badge
		const targetBadge = await this.badgesRepository.findOne({
			where: {
				label: addUserABadgeInput.badgeLabel,
			},
		})

		// if there is no either badge or user
		if (!targetUser || !targetBadge) throw new NotFoundException()

		// set target user with target badge
		targetUser.badges = [targetBadge]

		return await this.usersRepository.save(targetUser)
	}

	async findAll() {
		return await this.badgesRepository.find()
	}

	async remove(label: string) {
		// get target badge
		const targetBadge = await this.badgesRepository.findOne({
			where: {
				label: label,
			},
		})

		// if there is no badge
		if (!targetBadge) throw new NotFoundException()

		await this.badgesRepository.delete(targetBadge)
		return new DeleteBadgeResponse(targetBadge, 'DELETED', 200)
	}

	async removeBadgeFromUser(label: string, userId: string) {
		// get target user
		const targetUser = await this.usersRepository.findOne(userId, {
			relations: ['badges'],
		})
		// get badge
		const targetBadge = await this.badgesRepository.findOne({
			where: {
				label: label,
			},
		})

		// if there is no either badge or user
		if (!targetUser || !targetBadge) throw new NotFoundException()

		// set target user with target badge
		targetUser.badges = targetUser.badges.filter((badges) => {
			badges.id !== targetBadge.id
		})

		return await this.usersRepository.save(targetUser)
	}
}
