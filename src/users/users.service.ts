import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/auth.service'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@Inject(forwardRef(() => AuthService))
		private authService: AuthService
	) {}

	async create(createUserInput: CreateUserInput) {
		const createdUser = this.userRepository.create(createUserInput)
		/**
		 * update given token from JWT
		 * to the database, this access_token
		 * used to determine if the user is valid or not
		 */
		createdUser.access_token = await this.authService.generateToken(
			createdUser
		)
		/**
		 * Save the token and send back response
		 */
		return await this.userRepository.save(createdUser)
	}

	async findAll() {
		return await this.userRepository.find()
	}

	async findOne(username: string) {
		return await this.userRepository.findOneOrFail({
			where: { username: username },
		})
	}

	async getCred(username: string) {
		return await this.userRepository.findOneOrFail({
			where: { username: username },
			select: ['password'],
		})
	}

	async updateToken(username: string, token: string) {
		/**
		 * update given token from JWT
		 * to the database, this access_token
		 * used to determine if the user is valid or not
		 */
		const user = await this.userRepository.findOneOrFail({
			where: { username: username },
		})
		/**
		 * Update token
		 */
		user.access_token = token
		/**
		 * send back response
		 */
		return await this.userRepository.save(user)
	}
}
