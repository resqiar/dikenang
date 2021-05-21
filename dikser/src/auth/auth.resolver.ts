import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateUserInput } from '../users/dto/create-user.input'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
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
		return await this.usersService.create(createUserInput)
	}

	@Mutation(() => User, { name: 'login' })
	async login(@Args('loginInput') loginInput: LoginInputDTO): Promise<User> {
		return await this.authService.validateUser(
			loginInput.username,
			loginInput.password
		)
	}
}
