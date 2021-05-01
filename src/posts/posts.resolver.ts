import { UseGuards } from '@nestjs/common'
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/guards/gql-jwt.guard'
import { CurrentUser } from '../shared/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { CreateAttachmentInput } from './dto/create-attachments.input'
import { CreatePostInput } from './dto/create-post.input'
import { DeletePostResponse } from './dto/delete-response.dto'
import { UpdatePostInput } from './dto/update-post.input'
import { Post } from './entities/post.entity'
import { PostsService } from './posts.service'

@Resolver(() => Post)
export class PostsResolver {
	constructor(private readonly postsService: PostsService) {}

	@Mutation(() => Post)
	@UseGuards(GqlAuthGuard)
	async createPost(
		@CurrentUser() currentUser: User,
		@Args('createPostInput') createPostInput: CreatePostInput,
		@Args('createAttachmentInput', { nullable: true })
		createAttachmentInput?: CreateAttachmentInput //optional args
	): Promise<Post> {
		// If only there is no attachment provided
		if (!createAttachmentInput) {
			return await this.postsService.create(currentUser, createPostInput)
		}

		return await this.postsService.create(
			currentUser,
			createPostInput,
			createAttachmentInput
		)
	}

	@Query(() => [Post], { name: 'posts' })
	async findAll(): Promise<Post[]> {
		return await this.postsService.findAll()
	}

	@Query(() => Post, { name: 'post' })
	async findById(@Args('postId') postId: string): Promise<Post> {
		return await this.postsService.findById(postId)
	}

	@Mutation(() => Post)
	@UseGuards(GqlAuthGuard)
	async updatePost(
		@CurrentUser() user: User,
		@Args('updatePostInput') updatePostInput: UpdatePostInput
	) {
		return await this.postsService.update(user, updatePostInput)
	}

	@Mutation(() => DeletePostResponse)
	@UseGuards(GqlAuthGuard)
	async removePost(
		@CurrentUser() currentUser: User,
		@Args('postId') postId: string
	): Promise<DeletePostResponse> {
		return this.postsService.remove(currentUser, postId)
	}
}
