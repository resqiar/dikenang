import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'

@Controller('google')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get()
	@UseGuards(AuthGuard('google'))
	async googleAuth(@Req() _: any) {}

	@Get('redirect')
	@UseGuards(AuthGuard('google'))
	googleAuthRedirect(@Req() req: any) {
		return this.authService.googleAuth(req)
	}
}
