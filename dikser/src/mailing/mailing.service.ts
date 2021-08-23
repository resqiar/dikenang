import { Injectable } from '@nestjs/common'
import { MailingQueueProducer } from '../queues/producers/mailing-queue.producer'

@Injectable()
export class MailingService {
	constructor(private emailQueueService: MailingQueueProducer) {}

	/**
	 * @Queuing
	 * All these emails is not instantly sent to the user,
	 * instead it will be queued in redis first, in this way,
	 * we can reduce server constraints sending thousands of emails at once.
	 */
	async sendGreetingEmail(email: string, username: string) {
		await this.emailQueueService.sendGreetingEmailToQueue(username, email)
	}

	async sendNotificationsEmail(users: string[]) {
		await this.emailQueueService.sendNotificationsEmailToQueue(users)
	}
}
