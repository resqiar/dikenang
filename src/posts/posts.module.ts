import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsResolver } from './posts.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { UsersModule } from '../users/users.module'
import { Attachments } from './entities/attachments.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Post, Attachments]), UsersModule],
	providers: [PostsResolver, PostsService],
})
export class PostsModule {}
