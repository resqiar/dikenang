import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailingService {
	constructor(private mailerService: MailerService) {}

	async sendGreetingEmail(email: string, username: string) {
		await this.mailerService.sendMail({
			to: email,
			subject: `Welcome to our memorable community, ${username}!`,
			template: './greetings',
			context: {
				// ✏️ filling curly brackets with content
				username: username,
			},
		})
	}
}
