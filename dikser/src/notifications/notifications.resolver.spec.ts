import { Test, TestingModule } from '@nestjs/testing'
import { User } from '../users/entities/user.entity'
import { NotificationsDTO } from './dto/notifications-update.dto'
import { NotificationsResolver } from './notifications.resolver'
import { NotificationsService } from './notifications.service'

describe('NotificationsResolver', () => {
	let resolver: NotificationsResolver

	const mockNotificationsService = {
		getNotifications: jest.fn((_user: User) => {
			return [
				{
					id: 'id',
					type: 'vote',
					read: false,
					authorId: 'id',
					relatedPostId: 'id',
					created_at: new Date(),
					relatedUser: {
						id: 'id',
						username: 'username',
						avatar_url: 'avatar_url',
					},
				},
				{
					id: 'id',
					type: 'vote',
					read: false,
					authorId: 'id',
					relatedPostId: 'id',
					created_at: new Date(),
					relatedUser: {
						id: 'id',
						username: 'username',
						avatar_url: 'avatar_url',
					},
				},
			]
		}),
		readNotifications: jest.fn((_user: User) => {
			return { generatedMaps: [], raw: [], affected: 3 }
		}),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [NotificationsResolver, NotificationsService],
		})
			.overrideProvider(NotificationsService)
			.useValue(mockNotificationsService)
			.compile()

		resolver = module.get<NotificationsResolver>(NotificationsResolver)
	})

	it('should be defined', () => {
		expect(resolver).toBeDefined()
	})

	describe('Get notifications', () => {
		it('it should get all users notifications in the format of NotificationsDTO', async () => {
			const user = new User()

			expect(await resolver.getNotifications(user)).toBeInstanceOf(
				NotificationsDTO
			)
		})
	})

	describe('Read notifications', () => {
		it('it should update notifications from unread to read and return 200', async () => {
			const user = new User()

			expect(await resolver.readNotifications(user)).toEqual(200)
		})
	})
})
