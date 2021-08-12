import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { MailingQueueConsumer } from './consumers/mailing-queue.consumer'
import { MailingQueueProducer } from './producers/mailing-queue.producer'

@Module({
	imports: [
		// Bull Queue Configs
		BullModule.forRoot({
			redis: {
				host: process.env.REDIS_IP_ADDRESS,
				username: process.env.REDIS_USERNAME,
				port: Number(process.env.REDIS_PORT) || undefined,
				password: process.env.REDIS_PASSWORD,
				tls:
					process.env.NODE_ENV === 'production'
						? {
								rejectUnauthorized: false,
						  }
						: undefined,
			},
		}),
		BullModule.registerQueue({
			name: 'mailing-service-queues',
		}),
	],
	exports: [MailingQueueConsumer, MailingQueueProducer],
	providers: [MailingQueueConsumer, MailingQueueProducer],
})
export class QueuesModule {}
