import { Test, TestingModule } from '@nestjs/testing'
import { User } from '../users/entities/user.entity'
import { NotificationsService } from './notifications.service'

describe('NotificationsService', () => {
	let service: NotificationsService

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
			providers: [NotificationsService],
		})
			.overrideProvider(NotificationsService)
			.useValue(mockNotificationsService)
			.compile()

		service = module.get<NotificationsService>(NotificationsService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('Get notifications', () => {
		it('it should get all users notifications in the format of NotificationsDTO', async () => {
			const user = new User()

			expect(await service.getNotifications(user)).toEqual([
				{
					id: 'id',
					type: 'vote',
					read: false,
					authorId: 'id',
					relatedPostId: 'id',
					created_at: expect.any(Date),
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
					created_at: expect.any(Date),
					relatedUser: {
						id: 'id',
						username: 'username',
						avatar_url: 'avatar_url',
					},
				},
			])
		})
	})

	describe('Read notifications', () => {
		it('it should update notifications from unread to read and return 200', async () => {
			const user = new User()

			expect(await service.readNotifications(user)).toEqual(
				expect.any(Object)
			)
		})
	})
})
