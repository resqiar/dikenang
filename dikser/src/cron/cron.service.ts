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
}
