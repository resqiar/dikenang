import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'

@Injectable()
export class MailingQueueProducer {
	constructor(
		@InjectQueue('mailing-service-queues') private mailingQueue: Queue
	) {}

	async sendGreetingEmailToQueue(username: string, email: string) {
		await this.mailingQueue.add(
			'send-greeting-email',
			{
				username,
				email,
			},
			{
				delay: 5000, // 5 seconds
				attempts: 5,
				removeOnComplete: true,
			}
		)
	}
}
