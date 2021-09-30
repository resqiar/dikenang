import { Module } from '@nestjs/common'
import { SearchService } from './search.service'
import { SearchResolver } from './search.resolver'
import { PostsModule } from '../posts/posts.module'
import { UsersModule } from '../users/users.module'

@Module({
	imports: [UsersModule, PostsModule],
	providers: [SearchResolver, SearchService],
})
export class SearchModule {}
