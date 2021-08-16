import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostsService } from '../posts/posts.service'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { CreateNotificationInput } from './dto/create-notification.input'
import { NotificationsDTO } from './dto/notifications-update.dto'
import { Notification } from './entities/notifications.entity'

@Injectable()
export class NotificationsService {
	constructor(
		@InjectRepository(Notification)
		private notificationRepository: Repository<Notification>,
		private readonly usersService: UsersService,
		private readonly postsService: PostsService
	) {}

	async getNotifications(currentUser: User) {
		// search target user
		const targetUser = await this.usersService.findById(currentUser.id)

		// get all target user's notifications from the database
		return await this.notificationRepository.find({
			where: { relatedUser: targetUser },
			relations: ['relatedUser'],
			order: {
				created_at: 'DESC',
			},
		})
	}

	async readNotifications(currentUser: User) {
		/**
		 * Search data that match for the current user
		 * in the notification database.
		 * Then update read status to true.
		 */
		return await this.notificationRepository.update(
			{
				relatedUser: currentUser,
			},
			{ read: true }
		)
	}

	async createNotification(
		currentUser: User,
		createNotificationInput: CreateNotificationInput
	) {
		// find target post
		const targetPost = await this.postsService.findById(
			createNotificationInput.relatedPostId
		)

		// if user is the same as who author the post
		if (currentUser.id === targetPost.author.id) return

		// create notification first
		const createdNotification = this.notificationRepository.create(
			createNotificationInput
		)

		// search for corresponding author of the post
		const relatedUser = await this.usersService.findById(
			targetPost.author.id
		)

		// bind current user relation to createdNotification
		createdNotification.relatedUser = relatedUser

		// save to the database
		await this.notificationRepository.save(createdNotification)

		// get notification list of target user
		const newNotifications = await this.getNotifications(relatedUser)

		// filter unread notifications
		const unreadNotifications = newNotifications.filter(
			(value) => value.read === false
		).length

		// filter read notifications
		const readNotifications = newNotifications.filter(
			(value) => value.read === true
		).length

		return new NotificationsDTO(
			relatedUser.id,
			newNotifications,
			unreadNotifications,
			readNotifications
		)
	}
}
