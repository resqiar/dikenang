import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

describe('UsersService', () => {
	let service: UsersService

	const mockUsersRepository = {
		create: jest.fn((createUserInput: CreateUserInput) => {
			return {
				id: '1f85ac5e-4211-4b54-84cf-b202bfea344e',
				...createUserInput,
			}
		}),
		save: jest.fn((userInput: any) => {
			return {
				id: '1f85ac5e-4211-4b54-84cf-b202bfea344e',
				...userInput,
			}
		}),
		findOneOrFail: jest.fn(() => {
			return {
				id: '1f85ac5e-4211-4b54-84cf-b202bfea344e',
				email: 'testing@example.com',
				username: 'testing',
			}
		}),
		update: jest.fn((id: string, updateUserInput: UpdateUserInput) => {
			return {
				id: id,
				...updateUserInput,
			}
		}),
		findOne: jest.fn((id: string) => {
			if (id === '1f85ac5e-4211-4b54-84cf-b202bfea344e') {
				return {
					id: '1f85ac5e-4211-4b54-84cf-b202bfea344e',
					username: 'testing',
					avatar_url: 'http://test.test',
					email: 'testing@example.com',
					bio: 'testing',
				}
			}

			return undefined
		}),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: getRepositoryToken(User),
					useValue: mockUsersRepository,
				},
			],
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('create()', () => {
		it('should create new user along with oauth_id', async () => {
			const createUserInput: CreateUserInput = {
				email: 'testing@example.com',
				oauth_id: '123127312361283',
				username: 'testing',
				avatar_url: undefined,
			}

			const expectedResult = {
				id: expect.any(String),
				...createUserInput,
			}

			expect(await service.create(createUserInput)).toEqual(
				expectedResult
			)
		})
	})

	describe('find()', () => {
		it('findByUsername should return User with corresponding username', async () => {
			const searchedUsername: string = 'testing'

			const expectedResult = {
				id: expect.any(String),
				email: expect.any(String),
				username: searchedUsername,
			}

			expect(await service.findByUsername(searchedUsername)).toEqual(
				expectedResult
			)
		})

		it('findById should return User with corresponding id', async () => {
			const searchedId: string = '1f85ac5e-4211-4b54-84cf-b202bfea344e'

			const expectedResult = {
				id: searchedId,
				email: expect.any(String),
				username: expect.any(String),
			}

			expect(await service.findById(searchedId)).toEqual(expectedResult)
		})

		it('getBasicProfile should return basic information of the user', async () => {
			const searchedId: string = '1f85ac5e-4211-4b54-84cf-b202bfea344e'

			const expectedResult = {
				id: searchedId,
				username: expect.any(String),
				avatar_url: expect.any(String),
				email: expect.any(String),
				bio: expect.any(String),
			}

			expect(await service.getBasicProfile(searchedId)).toEqual(
				expectedResult
			)
		})

		it('getBasicProfile should return undefined if user not found', async () => {
			const searchedId: string = 'false id'

			expect(await service.getBasicProfile(searchedId)).toEqual(undefined)
		})
	})

	describe('update()', () => {
		it('should update user with provided data', async () => {
			const searchedId: string = '1f85ac5e-4211-4b54-84cf-b202bfea344e'
			const updateUserInput: UpdateUserInput = {
				username: 'updated',
			}

			const expectedResult = {
				id: searchedId,
				username: expect.any(String),
				email: expect.any(String),
			}

			expect(await service.update(searchedId, updateUserInput)).toEqual(
				expectedResult
			)
		})
	})
})
