import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { AuthStatusGuard } from '../auth/guards/auth.guard'
import { CurrentUser } from '../shared/decorators/current-user.decorator'
import { configureRedisPubSub } from '../shared/utils/redispubsub'
import { User } from '../users/entities/user.entity'
import { CommentsService } from './comments.service'
import { CommentsDTO } from './dto/comments.dto'
import { CreateCommentInput } from './dto/create-comment.input'
import { Comment } from './entities/comment.entity'

@Resolver(() => Comment)
export class CommentsResolver {
	private pubSub: RedisPubSub
	constructor(private readonly commentsService: CommentsService) {
		/**
		 * Redis Pub/Sub configurations
		 * @see https://github.com/davidyaha/graphql-redis-subscriptions
		 * @function src/shared/utils/redispubsub.ts
		 */
		this.pubSub = configureRedisPubSub()
	}

	@Mutation(() => Int)
	@UseGuards(AuthStatusGuard)
	async createComment(
		@CurrentUser() user: User,
		@Args('createCommentInput') createCommentInput: CreateCommentInput
	): Promise<number> {
		const newCommentsValue = await this.commentsService.createComment(
			createCommentInput,
			user.id
		)

		// send value via web socket (subscriptions)
		await this.pubSub.publish('commentsSubscriptions', {
			commentsSubscription: newCommentsValue,
		})

		return 200
	}

	/**
	 * @Subscriptions
	 * Graphql subscriptions for comments,
	 * provide real-time update
	 */
	@Subscription(() => CommentsDTO, {
		filter: (payload, variables) =>
			payload.commentsSubscription.postId === variables.postId,
	})
	commentsSubscription(@Args('postId') _postId: string) {
		return this.pubSub.asyncIterator('commentsSubscriptions')
	}
}
