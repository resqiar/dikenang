import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { GoogleStrategy } from './strategies/google.strategy'

@Module({
	imports: [
		forwardRef(() => UsersModule),
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1d' },
		}),
	],
	providers: [AuthService, AuthResolver, JwtStrategy, GoogleStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
