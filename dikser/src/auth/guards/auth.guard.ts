import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

/**
 * Guard use to protect resolver from
 * Unauthenticated user => will throw
 * forbidden error 403
 */
@Injectable()
export class AuthStatusGuard implements CanActivate {
	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const context = GqlExecutionContext.create(ctx)
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
