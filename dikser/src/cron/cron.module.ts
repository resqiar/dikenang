import { Module } from '@nestjs/common'
import { NotificationsModule } from '../notifications/notifications.module'
import { CronService } from './cron.service'

@Module({
	imports: [NotificationsModule],
	providers: [CronService],
})
export class CronModule {}
