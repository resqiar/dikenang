import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { AuthenticatedGuard } from './guards/auth.guard'
import { GoogleAuthGuard } from './guards/google.guard'
@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('google')
	@UseGuards(GoogleAuthGuard)
	googleAuth(@Req() _: any) {}

	@Get('google/redirect')
	@UseGuards(GoogleAuthGuard)
	async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
		/**
		 * "user" object comes from google strategy middleware
		 * @See - auth/strategies/google
		 */
		const response = await this.authService.googleAuth(req.user)
		if (response) return res.redirect('http://localhost:3001/')
		res.sendStatus(400)
	}

	/**
	 * @param req
	 * @Usage to revoke cookies
	 */
	@Get('auth/logout')
	@UseGuards(AuthenticatedGuard)
	logout(@Req() req: Request) {
		req.logOut()
	}
}
