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
		console.log(response)
		if (response) return res.redirect(process.env.CLIENT_ORIGIN!)
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

	@Get('auth/status')
	@UseGuards(AuthenticatedGuard)
	isLoggedIn(@Req() req: Request, @Res() res: Response) {
		// Send back user information when they are logged in
		const user = req?.user
		console.log(user)
		if (!user) return res.sendStatus(403)
		res.send(user)
	}
}
