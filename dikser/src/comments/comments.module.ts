import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsResolver } from './comments.resolver'
import { UsersModule } from '../users/users.module'
import { PostsModule } from '../posts/posts.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { NotificationsModule } from '../notifications/notifications.module'

@Module({
	imports: [
		UsersModule,
		PostsModule,
		TypeOrmModule.forFeature([Comment]),
		NotificationsModule,
	],
	providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
