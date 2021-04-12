import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	async create(createUserInput: CreateUserInput) {
		const createdUser = this.userRepository.create(createUserInput)
		return await this.userRepository.save(createdUser)
	}

	async findAll() {
		return await this.userRepository.find()
	}

	async findOne(id: string) {
		return await this.userRepository.findOneOrFail(id)
	}
}
