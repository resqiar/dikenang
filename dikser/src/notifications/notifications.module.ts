import { Module } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { NotificationsResolver } from './notifications.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Notification } from './entities/notifications.entity'
import { UsersModule } from '../users/users.module'

@Module({
	imports: [TypeOrmModule.forFeature([Notification]), UsersModule],
	exports: [NotificationsService],
	providers: [NotificationsResolver, NotificationsService],
})
export class NotificationsModule {}
