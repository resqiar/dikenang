import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostsService } from '../posts/posts.service'
import { UsersService } from '../users/users.service'
import { CommentsDTO } from './dto/comments.dto'
import { CreateCommentInput } from './dto/create-comment.input'
import { Comment } from './entities/comment.entity'

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(Comment)
		private commentsRepository: Repository<Comment>,
		private readonly postsService: PostsService,
		private readonly usersService: UsersService
	) {}

	async createComment(
		createCommentInput: CreateCommentInput,
		userId: string
	) {
		// find post
		const targetPost = await this.postsService.findById(
			createCommentInput.postId
		)

		// author target
		const author = await this.usersService.findById(userId)

		if (!targetPost || !author) throw new NotFoundException()

		// create comment
		const createComment = this.commentsRepository.create({
			text: createCommentInput.text,
			author: author,
			post: targetPost,
		})
		await this.commentsRepository.save(createComment)

		// find result
		const result = await this.postsService.findById(
			createCommentInput.postId
		)

		return new CommentsDTO(result.id, createComment, result.comments.length)
	}
}
