import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { BadRequestException, NotFoundException } from '@nestjs/common'

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Mutation(() => User)
	async createUser(
		@Args('createUserInput') createUserInput: CreateUserInput
	): Promise<User> {
		try {
			return await this.usersService.create(createUserInput)
		} catch (e) {
			throw new BadRequestException(e.message)
		}
	}

	@Query(() => [User], { name: 'users' })
	async findAll(): Promise<User[]> {
		return await this.usersService.findAll()
	}

	@Query(() => User, { name: 'user' })
	async findOne(@Args('id') id: string): Promise<User> {
		try {
			return await this.usersService.findOne(id)
		} catch (e) {
			/**
			 * @Error here means that client fails to get
			 * correct data from the database/data not found
			 */
			throw new NotFoundException(e.message)
		}
	}
}
