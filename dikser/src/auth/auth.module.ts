import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { GoogleStrategy } from './strategies/google.strategy'
import { SessionSerializer } from './utils/SessionSerializer'
import { BadgesModule } from '../badges/badges.module'
import { MailingModule } from '../mailing/mailing.module'

@Module({
	imports: [forwardRef(() => UsersModule), BadgesModule, MailingModule],
	providers: [AuthService, SessionSerializer, GoogleStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
