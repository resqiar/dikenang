import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Notification } from '../entities/notifications.entity'

@ObjectType()
export class NotificationsDTO {
	constructor(
		userId: string,
		notifications: Notification[],
		unread: number,
		read: number
	) {
		this.userId = userId
		this.notifications = notifications
		this.unread = unread
		this.read = read
	}

	@Field()
	userId: string

	@Field(() => [Notification])
	notifications: Notification[]

	@Field(() => Int)
	unread: number

	@Field(() => Int)
	read: number
}
