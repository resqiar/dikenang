import {
	forwardRef,
	Inject,
	Injectable,
	RequestTimeoutException,
} from '@nestjs/common'
import { BadgesService } from '../badges/badges.service'
import { MailingService } from '../mailing/mailing.service'
import { UsersService } from '../users/users.service'
import { GoogleDTO } from './dto/google.dto'
import Randomize from './utils/Randomize'

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UsersService))
		private usersService: UsersService,
		private readonly badgesService: BadgesService,
		private readonly mailingService: MailingService
	) {}

	async googleAuth(res: GoogleDTO) {
		if (!res) {
			return RequestTimeoutException
		}

		/**
		 * Search for available user in database;
		 * if none exist => create new
		 * if exist => return back
		 */
		const user = await this.usersService.findOauth(res.oauth_id)

		if (!user) {
			//  Create new user with the data from google
			const createdUser = await this.usersService.create({
				oauth_id: res.oauth_id,
				email: res.email,
				// create random username
				// will generate something like 'res_phc56FWNRX2w'
				username: Randomize(res.given_name),
				fullname: res.given_name ?? Randomize(),
				avatar_url: res.profile_url,
			})

			// limited time only
			// we give user a "Tester" badge for joining dikenang
			const testerBadge = await this.badgesService.findOne('Tester')
			if (!testerBadge) {
				const createdBadge = await this.badgesService.create({
					label: 'Tester',
					variant: 'outlined',
					color: 'var(--font-white-800)',
					border: 'var(--font-white-800)',
					background: 'transparent',
				})

				await this.badgesService.addUserABadge({
					badgeLabel: createdBadge.label,
					userId: createdUser.id,
				})
			} else {
				await this.badgesService.addUserABadge({
					badgeLabel: testerBadge.label,
					userId: createdUser.id,
				})
			}

			/**
			 *  Send email to newcomer user
			 * 	use nodemailer for sending emails
			 * 	see implementation in @see mailing.module.ts
			 */
			await this.mailingService.sendGreetingEmail(
				createdUser.email,
				res.given_name!
			)

			// return back to user
			return {
				id: createdUser.id,
				email: createdUser.email,
				username: createdUser.username,
				avatar_url: createdUser.avatar_url,
				bio: createdUser.bio,
			}
		}

		// return back to user
		return {
			id: user.id,
			email: user.email,
			username: user.username,
			avatar_url: user.avatar_url,
			bio: user.bio,
		}
	}
}
