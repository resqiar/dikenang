import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateAttachmentInput } from 'src/posts/dto/create-attachments.input'
import { Attachments } from '../posts/entities/attachments.entity'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { CreatePostInput } from '../posts/dto/create-post.input'
import { DeletePostResponse } from '../posts/dto/delete-response.dto'
import { UpdatePostInput } from '../posts/dto/update-post.input'
import { Post } from './entities/post.entity'

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(Post)
		private readonly postsRepository: Repository<Post>,
		@InjectRepository(Attachments)
		private readonly attachmentsRepository: Repository<Attachments>,
		private readonly usersService: UsersService
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
			relations: ['author', 'attachments'],
		})
	}

	async findById(postId: string) {
		try {
			return await this.postsRepository.findOneOrFail(postId)
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
			const relatedPost = await this.postsRepository.findOneOrFail(postId)

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
}
