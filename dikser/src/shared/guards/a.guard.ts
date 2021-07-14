import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'

@Injectable()
export class AGuard implements CanActivate {
	canActivate(
		ctx: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const context = GqlExecutionContext.create(ctx)
		const token = context.getContext().req.headers.key
		if (token !== process.env.A_KEY) {
			return false
		}
		return true
	}
}
