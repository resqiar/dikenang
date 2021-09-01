import { Test, TestingModule } from '@nestjs/testing'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

describe('UsersResolver', () => {
	let resolver: UsersResolver

	const mockUsersService = {
		findByUsername: jest.fn((username: string) => {
			// [MOCK] return User
			return {
				id: '4500fdce-c3ff-4646-bad5-d1b7748f4b54',
				username: username,
			}
		}),
		update: jest.fn((_: string, updateUserInput: UpdateUserInput) => {
			return {
				id: '4500fdce-c3ff-4646-bad5-d1b7748f4b54',
				...updateUserInput,
			}
		}),
		getBasicProfile: jest.fn((_id: string) => {
			return {
				id: '4500fdce-c3ff-4646-bad5-d1b7748f4b54',
				username: 'testing',
				avatar_url: 'http://test.test',
				email: 'testing@example.com',
				bio: 'testing',
			}
		}),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersResolver, UsersService],
		})
			.overrideProvider(UsersService)
			.useValue(mockUsersService)
			.compile()

		resolver = module.get<UsersResolver>(UsersResolver)
	})

	it('should be defined', () => {
		expect(resolver).toBeDefined()
	})

	describe('find user', () => {
		it('findOne() should return User with corresponding id', async () => {
			const expectedResult = {
				id: '4500fdce-c3ff-4646-bad5-d1b7748f4b54',
				username: 'testing',
			}
			expect(await resolver.findOne(expectedResult.username)).toEqual(
				expectedResult
			)
		})
	})

	describe('get basic user information', () => {
		it('getMyProfile() should return basic information of the user', async () => {
			const currentUser = new User()

			const expectedResult = {
				id: expect.any(String),
				username: expect.any(String),
				avatar_url: expect.any(String),
				email: expect.any(String),
				bio: expect.any(String),
			}

			expect(await resolver.getMyProfile(currentUser)).toEqual(
				expectedResult
			)
		})
	})

	describe('update user', () => {
		it('should update user with new provided data', async () => {
			const currentUser: User = new User()
			const updateUserInput: UpdateUserInput = {
				username: 'updated',
				avatar_url: 'updated',
			}

			const expectedResult = {
				id: expect.any(String),
				username: updateUserInput.username,
				avatar_url: updateUserInput.avatar_url,
			}

			expect(await resolver.update(currentUser, updateUserInput)).toEqual(
				expectedResult
			)
		})
	})
})
