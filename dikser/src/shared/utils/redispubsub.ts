import { RedisPubSub } from 'graphql-redis-subscriptions'
import * as Redis from 'ioredis'

export function configureRedisPubSub() {
	return new RedisPubSub({
		publisher: new Redis(
			process.env.REDIS_TLS_URL,
			process.env.NODE_ENV === 'production'
				? {
						tls: {
							rejectUnauthorized: false,
						},
				  }
				: undefined
		),
		subscriber: new Redis(
			process.env.REDIS_TLS_URL,
			process.env.NODE_ENV === 'production'
				? {
						tls: {
							rejectUnauthorized: false,
						},
				  }
				: undefined
		),
	})
}
