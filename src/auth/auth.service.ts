import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UsersService))
		private UsersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(username: string, password: string): Promise<User> {
		const selectedUser = await this.UsersService.findByUsername(username)
		const hashedPassword = await this.UsersService.getCred(username)

		/**
		 * Compare Input Password with Hashed Password
		 * Using bcrypt
		 */
		const isValid = await bcrypt.compare(password, hashedPassword.password)

		/**
		 * If password matches with hashed password,
		 * return user data, otherwise return UnauthorizedException
		 */
		if (isValid) {
			/**
			 * Generate token from JWT package
			 */
			const accessToken = await this.generateToken(selectedUser)

			/**
			 * @Return user with updated access_token
			 */
			return await this.UsersService.update(selectedUser.id, {
				access_token: accessToken,
			})
		} else {
			throw new BadRequestException('Invalid given username/password')
		}
	}

	/**
	 * @returns token assigned to current
	 * authenticated user with payload of
	 * id and username
	 */
	async generateToken(user: User) {
		const payload = { id: user.id, username: user.username }
		return await this.jwtService.signAsync(payload)
	}
}
