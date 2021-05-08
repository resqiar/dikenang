import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
	imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
	providers: [UsersResolver, UsersService],
	exports: [UsersService],
})
export class UsersModule {}
