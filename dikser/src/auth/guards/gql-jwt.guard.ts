import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
	getRequest(context: ExecutionContext) {
		/**
		 * @Extract and @Get request context
		 * from GraphQL request
		 */
		const ctx = GqlExecutionContext.create(context)
		return ctx.getContext().req
	}
}
