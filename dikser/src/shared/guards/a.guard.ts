import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AGuard implements CanActivate {
	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const context = GqlExecutionContext.create(ctx)
		const SPECIAL_ACCESS_KEY = context.getContext().req.headers.key

		if (SPECIAL_ACCESS_KEY) {
			const SPECIAL_ACCESS_GRANTED = await bcrypt.compare(
				SPECIAL_ACCESS_KEY,
				process.env.A_KEY!
			)
			if (SPECIAL_ACCESS_GRANTED) return true
		}

		return false
	}
}
