import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator(
	(_: unknown, context: ExecutionContext) => {
		const ctx = GqlExecutionContext.create(context)
		/**
		 * @Return current authenticated user
		 * from JWT access token
		 */
		return ctx.getContext().req.user
	}
)
