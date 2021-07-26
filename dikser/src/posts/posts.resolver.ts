import { UseGuards } from '@nestjs/common'
import {
	Mutation,
	Query,
	Args,
	Resolver,
	Subscription,
	Int,
} from '@nestjs/graphql'
import { AuthStatusGuard } from '../auth/guards/auth.guard'
import { CurrentUser } from '../shared/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { CreateAttachmentInput } from './dto/create-attachments.input'
import { CreatePostInput } from './dto/create-post.input'
import { DeletePostResponse } from './dto/delete-response.dto'
import { UpdatePostInput } from './dto/update-post.input'
import { Post } from './entities/post.entity'
import { PostsService } from './posts.service'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { configureRedisPubSub } from '../shared/utils/redispubsub'
import { UpvoteDTO } from './dto/votes/upvote.dto'
import { DownvoteDTO } from './dto/votes/downvote.dto'

@Resolver(() => Post)
export class PostsResolver {
	private pubSub: RedisPubSub
	constructor(private readonly postsService: PostsService) {
		/**
		 * Redis Pub/Sub configurations
		 * @see https://github.com/davidyaha/graphql-redis-subscriptions
		 * @function src/shared/utils/redispubsub.ts
		 */
		this.pubSub = configureRedisPubSub()
	}

	@Mutation(() => Post)
	@UseGuards(AuthStatusGuard)
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
	@UseGuards(AuthStatusGuard)
	async updatePost(
		@CurrentUser() user: User,
		@Args('updatePostInput') updatePostInput: UpdatePostInput
	) {
		return await this.postsService.update(user, updatePostInput)
	}

	@Mutation(() => DeletePostResponse)
	@UseGuards(AuthStatusGuard)
	async removePost(
		@CurrentUser() currentUser: User,
		@Args('postId') postId: string
	): Promise<DeletePostResponse> {
		return this.postsService.remove(currentUser, postId)
	}

	@Mutation(() => Int)
	@UseGuards(AuthStatusGuard)
	async addPostReachs(
		@CurrentUser() user: User,
		@Args('postId') postId: string
	): Promise<number> {
		return this.postsService.addPostReachs(postId, user.id)
	}

	@Query(() => Int)
	@UseGuards(AuthStatusGuard)
	async getPostReachs(@Args('postId') postId: string): Promise<number> {
		return this.postsService.getPostReachs(postId)
	}

	/**
	 * @param user
	 * @param postId
	 * @returns event to update 'upvote' subscription with the new value
	 */
	@Mutation(() => Int)
	@UseGuards(AuthStatusGuard)
	async addUpvote(@CurrentUser() user: User, @Args('postId') postId: string) {
		const newUpvoteValue = await this.postsService.addUpvote(
			postId,
			user.id
		)

		const returnValue = new UpvoteDTO(
			postId,
			newUpvoteValue.upvoter.length,
			newUpvoteValue.upvoter
		)

		await this.pubSub.publish('upvoteSubscriptions', {
			upvoteSubscription: returnValue,
		})

		return 200
	}

	/**
	 * @param user
	 * @param postId
	 * @returns event to update 'upvote' subscription with the new value
	 */
	@Mutation(() => Int)
	@UseGuards(AuthStatusGuard)
	async removeUpvote(
		@CurrentUser() user: User,
		@Args('postId') postId: string
	) {
		const newUpvoteValue = await this.postsService.removeUpvote(
			postId,
			user.id
		)

		const returnValue = new UpvoteDTO(
			postId,
			newUpvoteValue.upvoter.length,
			newUpvoteValue.upvoter
		)

		await this.pubSub.publish('upvoteSubscriptions', {
			upvoteSubscription: returnValue,
		})

		return 200
	}

	/**
	 * @param user
	 * @param postId
	 * @returns event to update 'downvote' subscription with the new value
	 */
	@Mutation(() => Int)
	@UseGuards(AuthStatusGuard)
	async addDownvote(
		@CurrentUser() user: User,
		@Args('postId') postId: string
	) {
		const newDownvoteValue = await this.postsService.addDownvote(
			postId,
			user.id
		)

		const returnValue = new DownvoteDTO(
			postId,
			newDownvoteValue.downvoter.length,
			newDownvoteValue.downvoter
		)

		await this.pubSub.publish('downvoteSubscriptions', {
			downvoteSubscription: returnValue,
		})

		return 200
	}

	/**
	 * @param user
	 * @param postId
	 * @returns event to update 'downvote' subscription with the new value
	 */
	@Mutation(() => Int)
	@UseGuards(AuthStatusGuard)
	async removeDownvote(
		@CurrentUser() user: User,
		@Args('postId') postId: string
	) {
		const newDownvoteValue = await this.postsService.removeDownvote(
			postId,
			user.id
		)

		const returnValue = new DownvoteDTO(
			postId,
			newDownvoteValue.downvoter.length,
			newDownvoteValue.downvoter
		)

		await this.pubSub.publish('downvoteSubscriptions', {
			downvoteSubscription: returnValue,
		})

		return 200
	}

	/**
	 * @Subscriptions
	 * Graphql subscriptions for upvote and
	 * downvote, provide real-time update
	 */
	@Subscription(() => UpvoteDTO, {
		filter: (payload, variables) =>
			payload.upvoteSubscription.postId === variables.postId,
	})
	upvoteSubscription(@Args('postId') _postId: string) {
		return this.pubSub.asyncIterator('upvoteSubscriptions')
	}

	@Subscription(() => DownvoteDTO, {
		filter: (payload, variables) =>
			payload.downvoteSubscription.postId === variables.postId,
	})
	downvoteSubscription(@Args('postId') _postId: string) {
		return this.pubSub.asyncIterator('downvoteSubscriptions')
	}
}
