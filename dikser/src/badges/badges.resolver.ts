import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { BadgesService } from './badges.service'
import { Badge } from './entities/badge.entity'
import { CreateBadgeInput } from './dto/create-badge.input'
import { User } from '../users/entities/user.entity'
import { AddUserABadgeInput } from './dto/adduser-badge.input'
import { DeleteBadgeResponse } from './dto/badge-delete.dto'
import { UseGuards } from '@nestjs/common'
import { AGuard } from '../shared/guards/a.guard'

@UseGuards(AGuard)
@Resolver(() => Badge)
export class BadgesResolver {
	constructor(private readonly badgesService: BadgesService) {}

	@Mutation(() => Badge)
	async createBadge(
		@Args('createBadgeInput') createBadgeInput: CreateBadgeInput
	): Promise<Badge> {
		return await this.badgesService.create(createBadgeInput)
	}

	@Mutation(() => User)
	async addUserABadge(
		@Args('addUserABadgeInput') addUserABadgeInput: AddUserABadgeInput
	): Promise<User> {
		return await this.badgesService.addUserABadge(addUserABadgeInput)
	}

	@Query(() => [Badge], { name: 'badges' })
	async findAll(): Promise<Badge[]> {
		return await this.badgesService.findAll()
	}

	@Query(() => Badge, { name: 'badge' })
	async findOne(@Args('label') label: string): Promise<Badge | undefined> {
		return await this.badgesService.findOne(label)
	}

	@Mutation(() => DeleteBadgeResponse)
	async removeBadge(
		@Args('label') label: string
	): Promise<DeleteBadgeResponse> {
		return await this.badgesService.remove(label)
	}

	@Mutation(() => User)
	async removeBadgeFromUser(
		@Args('label') label: string,
		@Args('userId') userId: string
	): Promise<any> {
		return await this.badgesService.removeBadgeFromUser(label, userId)
	}
}
