import { forwardRef, Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
	imports: [
		forwardRef(() => UsersModule),
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1d' },
		}),
	],
	providers: [AuthService, AuthResolver, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
