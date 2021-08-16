import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Resolver, Subscription } from '@nestjs/graphql'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { AuthStatusGuard } from '../auth/guards/auth.guard'
import { NotificationsService } from '../notifications/notifications.service'
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
	constructor(
		private readonly commentsService: CommentsService,
		private readonly notificationsService: NotificationsService
	) {
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

		// Create Notifications to target post owner
		const newNotification =
			await this.notificationsService.createNotification(user, {
				type: 'comment',
				relatedPostId: createCommentInput.postId,
				authorId: user.id,
			})

		// Return notification subscription value
		await this.pubSub.publish('notificationsSubscription', {
			notificationSubscription: newNotification,
		})

		return 200
	}

	@Mutation(() => Int)
	@UseGuards(AuthStatusGuard)
	async deleteComment(
		@CurrentUser() user: User,
		@Args('commentId') commentId: string
	): Promise<number> {
		const newCommentsValue = await this.commentsService.deleteComment(
			commentId,
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
