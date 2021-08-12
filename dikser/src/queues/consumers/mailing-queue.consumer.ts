import { MailerService } from '@nestjs-modules/mailer'
import { Processor, Process } from '@nestjs/bull'
import { Job } from 'bull'

@Processor('mailing-service-queues')
export class MailingQueueConsumer {
	constructor(private mailerService: MailerService) {}

	@Process('send-greeting-email')
	async sendGreetingEmailToUser(job: Job) {
		await this.mailerService.sendMail({
			to: job.data.email,
			subject: `Welcome to our memorable community, ${job.data.username}!`,
			template: './greetings',
			context: {
				// ✏️ filling curly brackets with content
				username: job.data.username,
			},
		})
	}
}
