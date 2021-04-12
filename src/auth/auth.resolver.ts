import { BadRequestException, Request, UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateUserInput } from 'src/users/dto/create-user.input'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { AuthService } from './auth.service'
import { LoginInputDTO } from './dto/login-input.dto'

@Resolver()
export class AuthResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService
	) {}

	@Mutation(() => User, { name: 'signUp' })
	async signUp(
		@Args('createUserInput') createUserInput: CreateUserInput
	): Promise<User> {
		try {
			return await this.usersService.create(createUserInput)
		} catch (e) {
			throw new BadRequestException(e.message)
		}
	}

	@Mutation(() => User, { name: 'login' })
	async login(@Args('loginInput') loginInput: LoginInputDTO) {
		return await this.authService.validateUser(
			loginInput.username,
			loginInput.password
		)
	}
}
