import { User } from '../users/entities/user.entity'
import {
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
} from 'typeorm'

import * as bcrypt from 'bcrypt'

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
	listenTo() {
		return User
	}
	/**
	 * This method get executed right before
	 * The data will be inserted into database
	 * @Usage Hashing Password
	 */
	async beforeInsert(event: InsertEvent<User>) {
		/**
		 * Modify value of plain password to
		 * Hashed password and store it in database
		 */
		event.entity.password = await bcrypt.hash(event.entity.password, 10)
	}
}
