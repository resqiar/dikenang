import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { NotificationsService } from '../notifications/notifications.service'

@Injectable()
export class CronService {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async clearReadNotificationsCron(): Promise<void> {
		await this.notificationsService.deleteReadNotifications()
	}

	/**
	 * Send emails to users every day at 8AM,
	 * reminding about their unread notifications.
	 * anyway for the template @see notifications.hbs
	 */
	@Cron(CronExpression.EVERY_DAY_AT_8AM)
	async sendNotificationsEmailsEveryDay(): Promise<void> {
		await this.notificationsService.sendUnreadNotificationsToEmail()
	}
}
