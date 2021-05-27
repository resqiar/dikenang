import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { User } from '../../users/entities/user.entity'
import { UsersService } from '../../users/users.service'

@Injectable()
export class SessionSerializer extends PassportSerializer {
	constructor(private readonly usersService: UsersService) {
		super()
	}

	serializeUser(
		user: User,
		done: (err: Error | null, user: User | null) => void
	) {
		done(null, user)
	}

	async deserializeUser(
		user: User,
		done: (err: Error | null, user: User | null) => void
	) {
		/**
		 * Find oauth_id in database;
		 * if yes => save it to sessions
		 * if not => do nothing
		 */
		const userDB = await this.usersService.findOauth(user.oauth_id)
		return userDB ? done(null, userDB) : done(null, null)
	}
}
