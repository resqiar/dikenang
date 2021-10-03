import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
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
	): Promise<User> {
		return await this.usersService.update(currentUser.id, updateUserInput)
	}

	@Mutation(() => User, { name: 'specialUpdateUser' })
	@UseGuards(AGuard)
	async specialUpdate(
		@Args('id') id: string,
		@Args('updateUserInput') updateUserInput: UpdateUserInput
	): Promise<User> {
		return await this.usersService.update(id, updateUserInput)
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
}
