import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { NotFoundException, UseGuards } from '@nestjs/common'
import { UpdateUserInput } from './dto/update-user.input'
import { GqlAuthGuard } from '../auth/guards/gql-jwt.guard'
import { CurrentUser } from '../shared/decorators/current-user.decorator'

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	/**
	 * @Usage Development Purpose Only,
	 * shouldnt be published to production
	 * since this query is not used for public
	 */
	@Query(() => [User], { name: 'users' })
	async findAll(): Promise<User[]> {
		return await this.usersService.findAll()
	}

	@Query(() => User, { name: 'user' })
	async findOne(@Args('username') username: string): Promise<User> {
		return await this.usersService.findOne(username)
	}

	@Mutation(() => User, { name: 'updateUser' })
	@UseGuards(GqlAuthGuard)
	async update(
		@CurrentUser() currentUser: User,
		@Args('updateUserInput') updateUserInput: UpdateUserInput
	): Promise<User> {
		return await this.usersService.update(currentUser.id, updateUserInput)
	}
}
