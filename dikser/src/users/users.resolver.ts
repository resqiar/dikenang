import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { UseGuards } from '@nestjs/common'
import { UpdateUserInput } from './dto/update-user.input'
import { CurrentUser } from '../shared/decorators/current-user.decorator'
import { AuthStatusGuard } from '../auth/guards/auth.guard'

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	/**
	 * @Usage Development Purpose Only,
	 * shouldnt be published to production
	 * since this query is not used for public
	 */
	// @Query(() => [User], { name: 'users' })
	// @UseGuards(AuthStatusGuard)
	// async findAll(): Promise<User[]> {
	// 	return await this.usersService.findAll()
	// }

	@Query(() => User, { name: 'user' })
	async findOne(@Args('username') username: string): Promise<User> {
		return await this.usersService.findByUsername(username)
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
