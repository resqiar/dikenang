import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Subscription } from '@nestjs/graphql'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { AuthStatusGuard } from '../auth/guards/auth.guard'
import { CurrentUser } from '../shared/decorators/current-user.decorator'
import { configureRedisPubSub } from '../shared/utils/redispubsub'
import { User } from '../users/entities/user.entity'
import { NotificationsDTO } from './dto/notifications-update.dto'
import { NotificationsService } from './notifications.service'

@Resolver()
export class NotificationsResolver {
	private pubSub: RedisPubSub
	constructor(private readonly notificationsService: NotificationsService) {
		/**
		 * Redis Pub/Sub configurations
		 * @see https://github.com/davidyaha/graphql-redis-subscriptions
		 * @function src/shared/utils/redispubsub.ts
		 */
		this.pubSub = configureRedisPubSub()
	}

	@Query(() => NotificationsDTO, { name: 'notifications' })
	@UseGuards(AuthStatusGuard)
	async getNotifications(
		@CurrentUser() currentUser: User
	): Promise<NotificationsDTO> {
		// Get all notifications from the database
		const notifications = await this.notificationsService.getNotifications(
			currentUser
		)

		// Filter unread notifications
		const unreadNotifications = notifications.filter(
			(value) => value.read === false
		).length

		// Filter read notifications
		const readNotifications = notifications.filter(
			(value) => value.read === true
		).length

		return new NotificationsDTO(
			notifications,
			unreadNotifications,
			readNotifications
		)
	}

	@Subscription(() => NotificationsDTO, {
		filter: (payload, variables) =>
			payload.notificationSubscription.userId === variables.userId,
	})
	notificationSubscription(@Args('userId') _userId: string) {
		return this.pubSub.asyncIterator('notificationSubscription')
	}
}
