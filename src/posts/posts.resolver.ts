import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PostsService } from './posts.service'
import { Post } from './entities/post.entity'
import { CreatePostInput } from '../posts/dto/create-post.input'
import { UpdatePostInput } from '../posts/dto/update-post.input'
import { User } from 'src/users/entities/user.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/guards/gql-jwt.guard'
import { CurrentUser } from 'src/shared/decorators/current-user.decorator'
import { DeletePostResponse } from '../posts/dto/delete-response.dto'
import { CreateAttachmentInput } from 'src/posts/dto/create-attachments.input'

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
