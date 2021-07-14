import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { UseGuards } from '@nestjs/common'
import { UpdateUserInput } from './dto/update-user.input'
import { CurrentUser } from '../shared/decorators/current-user.decorator'
import { AuthStatusGuard } from '../auth/guards/auth.guard'
import { AGuard } from '../shared/guards/a.guard'

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

	@Query(() => User, { name: 'getMyProfile' })
	@UseGuards(AuthStatusGuard)
	async getMyProfile(@CurrentUser() currentUser: User): Promise<User> {
		return await this.usersService.findByUsername(currentUser.username)
	}

	@Mutation(() => User, { name: 'updateUser' })
	@UseGuards(AuthStatusGuard)
	async update(
		@CurrentUser() currentUser: User,
		@Args('updateUserInput') updateUserInput: UpdateUserInput
	): Promise<User> {
		return await this.usersService.update(currentUser.id, updateUserInput)
	}
}
