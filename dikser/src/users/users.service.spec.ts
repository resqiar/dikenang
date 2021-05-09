import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { FindOneOptions } from 'typeorm'
import { AuthService } from '../auth/auth.service'
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
		findOneOrFail: jest.fn((options?: FindOneOptions<User>) => {
			// check if has a password query
			if (options.select?.includes('password')) {
				return {
					id: '1f85ac5e-4211-4b54-84cf-b202bfea344e',
					email: 'testing@example.com',
					username: 'testing',
					password: 'hashed_password',
				}
			} else {
				return {
					id: '1f85ac5e-4211-4b54-84cf-b202bfea344e',
					email: 'testing@example.com',
					username: 'testing',
				}
			}
		}),
		update: jest.fn((id: string, updateUserInput: UpdateUserInput) => {
			return {
				id: id,
				...updateUserInput,
			}
		}),
	}
	const mockAuthService = {
		generateToken: jest.fn(() => {
			return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpbmciLCJlbWFpbCI6InRlc3RpbmdAZXhhbXBsZS5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.ymAk4I3k0M4Qu67JCAMpyzibak66RVNwVwAH1uMEAOQ'
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
				{
					provide: AuthService,
					useValue: mockAuthService,
				},
			],
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('create()', () => {
		it('should create new user along with its access_token', async () => {
			const createUserInput: CreateUserInput = {
				email: 'testing@example.com',
				username: 'testing',
				password: 'password',
				avatar_url: null,
			}

			const expectedResult = {
				id: expect.any(String),
				access_token: expect.any(String),
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
	})

	describe('getCred()', () => {
		it('should return a user with hashed_password', async () => {
			const searchedUsername: string = 'testing'

			const expectedResult = {
				id: expect.any(String),
				email: expect.any(String),
				username: searchedUsername,
				password: expect.any(String),
			}

			expect(await service.getCred(searchedUsername)).toEqual(
				expectedResult
			)
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
