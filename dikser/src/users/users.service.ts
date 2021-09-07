import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	async create(createUserInput: CreateUserInput) {
		try {
			const createdUser = this.userRepository.create(createUserInput)

			/**
			 * Save and return createdUser
			 */
			return await this.userRepository.save(createdUser)
		} catch (e) {
			/**
			 * @Error here means that client fails to
			 * register user to database, @Possibly duplicate
			 * username or email fields
			 */
			throw new BadRequestException(e.detail)
		}
	}

	async findAll() {
		return await this.userRepository.find({
			relations: ['contents', 'badges', 'contents.attachments'],
		})
	}

	async findOauth(oauthId: string) {
		/**
		 * @Usage is to search if user already signIn by its oauthId
		 */
		return await this.userRepository.findOne({
			where: { oauth_id: oauthId },
			select: ['id', 'email', 'username', 'avatar_url', 'bio'],
		})
	}

	async findByUsername(username: string) {
		try {
			return await this.userRepository.findOneOrFail({
				where: { username: username },
				relations: ['badges'],
			})
		} catch (e) {
			/**
			 * @Error here means that client fails to get
			 * correct data from the database/data not found
			 */
			throw new NotFoundException(e.detail)
		}
	}

	async getBasicProfile(id: string) {
		console.log('C', new Date().getTime())
		const result = await this.userRepository.findOne(id)
		console.log('D', new Date().getTime())
		return result
	}

	async findById(id: string) {
		try {
			return await this.userRepository.findOneOrFail({
				where: { id: id },
				relations: ['relationship'],
			})
		} catch (e) {
			/**
			 * @Error here means that client fails to get
			 * correct data from the database/data not found
			 */
			throw new NotFoundException(e.detail)
		}
	}

	async update(id: string, updateUserInput: UpdateUserInput) {
		try {
			/**
			 * update given input from @UpdateUserInput
			 */
			await this.userRepository.update(
				id,
				Object.assign({}, updateUserInput)
			)

			/**
			 * @Returns updated User object
			 */
			return await this.userRepository.findOneOrFail(id)
		} catch (e) {
			/**
			 * @Error here means that client fails to
			 * update user to database, @Possibly duplicate
			 * username or email fields
			 */
			throw new BadRequestException(e.detail)
		}
	}
}
