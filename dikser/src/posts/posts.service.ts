import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RelationshipService } from '../relationship/relationship.service'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { CreateAttachmentInput } from './dto/create-attachments.input'
import { CreatePostInput } from './dto/create-post.input'
import { DeletePostResponse } from './dto/delete-response.dto'
import { UpdatePostInput } from './dto/update-post.input'
import { Attachments } from './entities/attachments.entity'
import { Post } from './entities/post.entity'

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(Post)
		private readonly postsRepository: Repository<Post>,
		@InjectRepository(Attachments)
		private readonly attachmentsRepository: Repository<Attachments>,
		private readonly usersService: UsersService,
		private readonly relationshipService: RelationshipService
	) {}

	async create(
		currentUser: User,
		createPostInput: CreatePostInput,
		createAttachmentInput?: CreateAttachmentInput //optional args
	) {
		// search for corresponding user creating the post
		const relatedUser = await this.usersService.findById(currentUser.id)

		/**
		 * Create each data object for @Post and @Attachments
		 * Client must provide Post data along with its attachments
		 */
		const createdPost = this.postsRepository.create(createPostInput)
		createdPost.author = relatedUser

		/**
		 * If user set @type to private
		 * configure relation table between
		 * Post and Relationship
		 */
		if (createPostInput.type === 'private') {
			// if there is no relationship, throw an error
			if (!relatedUser.relationship)
				throw new BadRequestException(
					'You do not have relationship just yet'
				)

			/**
			 * After validate if user has a relationship,
			 * Search for that corresponding relationship.
			 */
			const currentRelationship = await this.relationshipService.findById(
				relatedUser.relationship.id
			)

			// if there is no relationship, throw an error
			if (!currentRelationship)
				throw new BadRequestException(
					'You do not have relationship just yet'
				)

			/**
			 * Bind @Post entity and @Relationship entity.
			 * This relation means a post should only have one relationship
			 * And one relationship could have a lot of posts
			 */
			createdPost.relationship = currentRelationship
		}

		/**
		 * If user does not have any attachments
		 * in its post, set relation between post and
		 * attachments to null
		 */
		if (createAttachmentInput) {
			const createdAttachments = this.attachmentsRepository.create(
				createAttachmentInput
			)

			await this.attachmentsRepository.save(createdAttachments)
			/**
			 * Bind relationship between @Post @User and @Attachments
			 * This will create table relation in between.
			 */
			createdPost.attachments = createdAttachments
		}

		// return finished data back to user
		return await this.postsRepository.save(createdPost)
	}

	async findAll() {
		return await this.postsRepository.find({
			where: {
				type: 'public',
			},
			relations: [
				'author',
				'author.badges',
				'attachments',
				'relationship',
				'relationship.partnership',
				'reachs',
				'upvoter',
				'downvoter',
			],
			order: {
				created_at: 'DESC',
			},
		})
	}

	async findById(postId: string) {
		try {
			const relatedPost = await this.postsRepository.findOneOrFail(
				postId,
				{
					relations: [
						'upvoter',
						'author',
						'reachs',
						'downvoter',
						'comments',
						'comments.author',
						'attachments',
					],
				}
			)

			// if post is not public, throw an error
			if (relatedPost.type === 'private') throw new NotFoundException()
			return relatedPost
		} catch (e) {
			/**
			 * @Error here means that client fails to get
			 * correct data from the database/data not found
			 */
			throw new NotFoundException(e.message)
		}
	}

	async update(currentUser: User, updatePostInput: UpdatePostInput) {
		try {
			const relatedPost = await this.postsRepository.findOneOrFail(
				updatePostInput.id
			)

			/**
			 * Check if current post is related to
			 * the current user, if not, throw an exception
			 */
			if (relatedPost.author.id !== currentUser.id)
				throw new NotFoundException()

			/**
			 * update given input from @UpdatePostInput
			 */
			await this.postsRepository.update(
				updatePostInput.id,
				Object.assign({}, updatePostInput)
			)

			// Returns updated Post object
			return await this.postsRepository.findOneOrFail(updatePostInput.id)
		} catch (e) {
			switch (e.status) {
				case 401:
					throw new UnauthorizedException(e.message)
					break

				case 404:
					throw new NotFoundException(e.message)

				default:
					throw new BadRequestException(e.message)
					break
			}
		}
	}

	async remove(currentUser: User, postId: string) {
		try {
			const relatedPost = await this.postsRepository.findOneOrFail(
				postId,
				{
					relations: ['author'],
				}
			)
			/**
			 * Check if current post is related to
			 * the current user, if not, throw an exception
			 */
			if (relatedPost.author.id !== currentUser.id)
				throw new NotFoundException()

			await this.postsRepository.delete(postId)

			/**
			 * Return formatted delete result
			 * Which is highly customizeable response
			 * @see delete-response.dto.ts
			 */
			return new DeletePostResponse(relatedPost, 'DELETED', 200)
		} catch (e) {
			switch (e.status) {
				case 401:
					throw new UnauthorizedException(e.message)
					break

				case 404:
					throw new NotFoundException(e.message)

				default:
					throw new BadRequestException(e.message)
					break
			}
		}
	}

	/**
	 * These two services below used to handle post reachs/views
	 * When "public" post is shown in someone feeds
	 * @addPostReachs should be called
	 */
	async getPostReachs(postId: string) {
		const targetPost = await this.findById(postId)
		if (!targetPost.reachs) return 0
		return targetPost.reachs.length
	}

	async addPostReachs(postId: string, userId: string) {
		const targetPost = await this.findById(postId)
		const user = await this.usersService.findById(userId)

		// if user already viewed
		if (targetPost.reachs.find((value) => value.id === user.id)) return 200

		// if user is the author of the post => exclude
		if (targetPost.author.id === user.id) return 200

		// Add User
		targetPost.reachs = [...targetPost.reachs, user]
		await this.postsRepository.save(targetPost)

		return 200
	}

	/**
	 * @Upvotes
	 * Services to handle changes when user
	 * Downvoting a post then save it to the database
	 */
	async addUpvote(postId: string, userId: string) {
		const targetPost = await this.findById(postId)
		const upvoter = await this.usersService.findById(userId)

		// Add User Upvote
		targetPost.upvoter = [...targetPost.upvoter, upvoter]

		return await this.postsRepository.save(targetPost)
	}

	async removeUpvote(postId: string, userId: string) {
		const targetPost = await this.findById(postId)
		const upvoter = await this.usersService.findById(userId)

		// Delete User Upvote
		targetPost.upvoter = targetPost.upvoter.filter(
			(voter) => voter.id !== upvoter.id
		)

		return await this.postsRepository.save(targetPost)
	}

	/**
	 * @Downvotes
	 * Services to handle changes when user
	 * Downvoting a post then save it to the database
	 */
	async addDownvote(postId: string, userId: string) {
		const targetPost = await this.findById(postId)
		const downVoter = await this.usersService.findById(userId)

		// Add User Downvote
		targetPost.downvoter = [...targetPost.downvoter, downVoter]

		return await this.postsRepository.save(targetPost)
	}

	async removeDownvote(postId: string, userId: string) {
		const targetPost = await this.findById(postId)
		const downVoter = await this.usersService.findById(userId)

		// Delete User Downvote
		targetPost.downvoter = targetPost.downvoter.filter(
			(voter) => voter.id !== downVoter.id
		)

		return await this.postsRepository.save(targetPost)
	}

	async getPostComments(postId: string) {
		const targetPost = await this.findById(postId)

		if (!targetPost) throw new NotFoundException()

		// Sort comments by Date
		return targetPost.comments.sort(
			(a, b) => Number(a.created_at) - Number(b.created_at)
		)
	}
}
