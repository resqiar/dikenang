import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { CreateNotificationInput } from './dto/create-notification.input'
import { Notification } from './entities/notifications.entity'

@Injectable()
export class NotificationsService {
	constructor(
		@InjectRepository(Notification)
		private notificationRepository: Repository<Notification>,
		private readonly usersService: UsersService
	) {}

	async getNotifications(currentUser: User) {
		// search target user
		const targetUser = await this.usersService.findById(currentUser.id)

		// get all target user's notifications from the database
		return await this.notificationRepository.find({
			where: { relatedUser: targetUser },
		})
	}

	async createNotification(
		targetUserId: string,
		createNotificationInput: CreateNotificationInput
	) {
		// create notification first
		const createdNotification = this.notificationRepository.create(
			createNotificationInput
		)

		// search for corresponding author
		const relatedUser = await this.usersService.findById(targetUserId)

		// bind current user relation to createdNotification
		createdNotification.relatedUser = relatedUser

		// save to the database
		return await this.notificationRepository.save(createdNotification)
	}
}
