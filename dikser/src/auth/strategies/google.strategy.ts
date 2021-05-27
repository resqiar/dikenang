import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import { GoogleDTO } from '../dto/google.dto'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor() {
		super({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: 'http://localhost:3000/google/redirect',
			scope: ['email', 'profile'],
		})
	}

	async validate(
		_: string,
		__: string,
		profile: Profile,
		done: VerifyCallback
	): Promise<any> {
		const { id, name, emails, photos } = profile

		// Get response object from Google API
		const response: GoogleDTO = {
			oauth_id: id,
			email: emails![0].value,
			given_name: name?.givenName,
			profile_url: photos?.[0].value,
		}

		/**
		 * Redirect back to controller
		 * As a "user" object
		 */
		done(null, response)
	}
}
