import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import * as bcrypt from 'bcryptjs'

/**
 * Guard use to protect resolver from
 * Unauthenticated user => will throw
 * forbidden error 403
 */
@Injectable()
export class AuthStatusGuard implements CanActivate {
	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const context = GqlExecutionContext.create(ctx)

		/**
		 * Special access is basically Author of dikenang
		 * Trying to access routes that doesnt require to login (cookies),
		 * We need this to ensure we have a "management" on certain
		 * Routes to keep dikenang running correctly.
		 */
		const SPECIAL_ACCESS_KEY = context.getContext().req.headers.key

		if (SPECIAL_ACCESS_KEY) {
			const SPECIAL_ACCESS_GRANTED = await bcrypt.compare(
				SPECIAL_ACCESS_KEY,
				process.env.A_KEY!
			)
			if (SPECIAL_ACCESS_GRANTED) return true
		}

		// Return user data granted from login
		return context.getContext().req.user
	}
}

/**
 * Guard use to determine/check whether user is
 * Authenticated or not. provide method like;
 * @method logOut()
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest()
		return req.isAuthenticated()
	}
}
