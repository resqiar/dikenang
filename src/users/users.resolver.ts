import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { NotFoundException, UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/guards/gql-jwt.guard'

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
	@UseGuards(GqlAuthGuard)
	async findOne(@Args('username') username: string): Promise<User> {
		try {
			return await this.usersService.findOne(username)
		} catch (e) {
			/**
			 * @Error here means that client fails to get
			 * correct data from the database/data not found
			 */
			throw new NotFoundException(e.message)
		}
	}
}
