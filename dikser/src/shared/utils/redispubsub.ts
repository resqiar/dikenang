import { RedisPubSub } from 'graphql-redis-subscriptions'
import * as Redis from 'ioredis'

export function configureRedisPubSub() {
	/**
	 * This function is used to "revive" Date object.
	 * previously, Date object will vanish after entering redis pub/sub.
	 * in other words, created_at, updated_at field will always return null.
	 * @see https://github.com/davidyaha/graphql-redis-subscriptions#using-a-custom-reviver
	 */
	const dateReviver = (_key: any, value: any) => {
		const isISO8601Z =
			/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/
		if (typeof value === 'string' && isISO8601Z.test(value)) {
			const tempDateNumber = Date.parse(value)
			if (!isNaN(tempDateNumber)) {
				return new Date(tempDateNumber)
			}
		}
		return value
	}

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
		reviver: dateReviver,
	})
}
