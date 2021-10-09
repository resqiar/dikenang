import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { UseGuards } from '@nestjs/common'
import { UpdateUserInput } from './dto/update-user.input'
import { CurrentUser } from '../shared/decorators/current-user.decorator'
import { AuthStatusGuard } from '../auth/guards/auth.guard'
import { AGuard } from '../shared/guards/a.guard'
import { UserAttachment } from './dto/user-attachment.dto'

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => [User], { name: 'users' })
	@UseGuards(AGuard)
	async findAll(): Promise<User[]> {
		return await this.usersService.findAll()
	}

	@Query(() => User, { name: 'user' })
	async findOne(@Args('username') username: string): Promise<User> {
		return await this.usersService.findByUsername(username)
	}

	@Query(() => User, { name: 'getUserById' })
	async findById(@Args('id') id: string): Promise<User> {
		return await this.usersService.findById(id)
	}

	@Query(() => User, { name: 'getMyProfile' })
	@UseGuards(AuthStatusGuard)
	async getMyProfile(
		@CurrentUser() currentUser: User
	): Promise<User | undefined> {
		return await this.usersService.getBasicProfile(currentUser.id)
	}

	@Mutation(() => User, { name: 'updateUser' })
	@UseGuards(AuthStatusGuard)
	async update(
		@CurrentUser() currentUser: User,
		@Args('updateUserInput') updateUserInput: UpdateUserInput
	): Promise<User | undefined> {
		return await this.usersService.update(currentUser, updateUserInput)
	}

	@Query(() => [User])
	@UseGuards(AuthStatusGuard)
	async searchUserRelevance(
		@Args('input') input: string
	): Promise<User[] | undefined> {
		return await this.usersService.findRelevance(input)
	}

	@Query(() => UserAttachment)
	async getUserAttachment(
		@Args('username') username: string
	): Promise<UserAttachment | undefined> {
		return await this.usersService.getUserAttachment(username)
	}

	@Mutation(() => Int)
	@UseGuards(AuthStatusGuard)
	async follow(
		@CurrentUser() currentUser: User,
		@Args('username') username: string
	): Promise<number | undefined> {
		return await this.usersService.follow(currentUser, username)
	}

	@Mutation(() => Int)
	@UseGuards(AuthStatusGuard)
	async unfollow(
		@CurrentUser() currentUser: User,
		@Args('username') username: string
	): Promise<number | undefined> {
		return await this.usersService.unfollow(currentUser, username)
	}

	@Query(() => Int)
	@UseGuards(AuthStatusGuard)
	async checkUsername(
		@CurrentUser() currentUser: User,
		@Args('username') username: string
	): Promise<number> {
		return await this.usersService.checkUsername(currentUser, username)
	}
}
