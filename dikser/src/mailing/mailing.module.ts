import { Module } from '@nestjs/common'
import { MailingService } from './mailing.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { join } from 'path'

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: process.env.MAILING_HOST,
				secure: process.env.NODE_ENV === 'production',
				auth: {
					user: process.env.MAILING_USERNAME,
					pass: process.env.MAILING_PASSWORD,
				},
			},
			defaults: {
				from: process.env.MAILING_FROM_DEFAULT,
			},
			template: {
				dir: join(__dirname, 'templates'),
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			},
		}),
	],
	providers: [MailingService],
	exports: [MailingService],
})
export class MailingModule {}
