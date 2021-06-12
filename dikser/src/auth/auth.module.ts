import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { GoogleStrategy } from './strategies/google.strategy'
import { SessionSerializer } from './utils/SessionSerializer'
@Module({
	imports: [forwardRef(() => UsersModule)],
	providers: [AuthService, SessionSerializer, GoogleStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
