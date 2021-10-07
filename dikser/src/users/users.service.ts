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
			throw new BadRequestException()
		}
	}

	async findAll() {
		return await this.userRepository.find({
			relations: ['contents', 'badges', 'contents.attachments'],
		})
	}

	async findRelevance(input: string) {
		/**
		 * Search relevance of a certain field
		 * with postgres natural way.
		 */
		const formattedQuery = input
			.trim()
			.replace(/[^a-zA-Z0-9 ]/g, '')
			.replace(/ /g, '&')
		if (formattedQuery.length === 0) return
		return await this.userRepository
			.createQueryBuilder()
			.select('user')
			.from(User, 'user')
			.where(`to_tsvector(user.username) @@ to_tsquery(:query)`, {
				query: `${formattedQuery}:*`,
			})
			.getMany()
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
				relations: ['badges', 'relationship', 'followers', 'following'],
			})
		} catch (e) {
			/**
			 * @Error here means that client fails to get
			 * correct data from the database/data not found
			 */
			throw new NotFoundException()
		}
	}

	async getBasicProfile(id: string) {
		const result = await this.userRepository.findOne(id)
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
			throw new NotFoundException()
		}
	}

	async getUserPublics(username: string) {
		const targetUser = await this.userRepository.findOne({
			where: { username: username },
			relations: ['contents', 'contents.upvoter'],
		})

		if (!targetUser || targetUser.contents.length === 0) return
		return targetUser.contents.filter((value) => value.type === 'public')
	}

	async getUserUpvotes(username: string) {
		let upvotes = 0
		const posts = await this.getUserPublics(username)

		if (!posts) return 0

		posts.forEach((value) => {
			upvotes += value.upvoter.length
		})

		return upvotes
	}

	async getUserAttachment(username: string) {
		const targetRelationship = await this.findByUsername(username)
		const targetPublics = await this.getUserPublics(username)
		const targetUpvotes = await this.getUserUpvotes(username)

		return {
			publics: targetPublics?.length ?? 0,
			// Folls not implemented yet
			folls: 0,
			upvotes: targetUpvotes,
			relationship: targetRelationship.relationship ? true : false,
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
			throw new BadRequestException()
		}
	}

	async follow(currentUser: User, username: string) {
		const user = await this.userRepository.findOne(currentUser.id, {
			relations: ['following'],
		})
		const targetUser = await this.userRepository.findOne({
			where: {
				username: username,
			},
			relations: ['followers'],
		})

		if (!user || !targetUser || user.id === targetUser.id) return

		// bind follow - follower
		targetUser.followers = [...targetUser.followers, user]
		user.following = [...user.following, targetUser]

		await this.userRepository.save(user)
		await this.userRepository.save(targetUser)

		return 200
	}

	async unfollow(currentUser: User, username: string) {
		const user = await this.userRepository.findOne(currentUser.id, {
			relations: ['following'],
		})
		const targetUser = await this.userRepository.findOne({
			where: {
				username: username,
			},
			relations: ['followers'],
		})

		if (!user || !targetUser || user.id === targetUser.id) return

		// bind follow - follower
		targetUser.followers = targetUser.followers.filter(
			(follower) => follower.id !== user.id
		)
		user.following = user.following.filter(
			(following) => following.id !== targetUser.id
		)

		await this.userRepository.save(user)
		await this.userRepository.save(targetUser)

		return 200
	}
}
