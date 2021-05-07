import { Test, TestingModule } from '@nestjs/testing'
import { CreateUserInput } from '../users/dto/create-user.input'
import { UsersService } from '../users/users.service'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

describe('AuthResolver', () => {
	let resolver: AuthResolver

	const mockAuthService = {}
	const mockUsersService = {
		create: jest.fn((createUserInput: CreateUserInput) => {
			return {
				id: '4500fdce-c3ff-4646-bad5-d1b7748f4b54',
				...createUserInput,
			}
		}),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthResolver,
				{
					provide: AuthService,
					useValue: mockAuthService,
				},
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile()

		resolver = module.get<AuthResolver>(AuthResolver)
	})

	it('should be defined', () => {
		expect(resolver).toBeDefined()
	})

	describe('register/signup', () => {
		it('should register a new user and return back its data', async () => {
			const newUserInput: CreateUserInput = {
				username: 'testing',
				password: 'password',
				email: 'testing@example.com',
				avatar_url: null, //optional args
			}

			const expectedResult: Object = {
				id: expect.any(String),
				...newUserInput,
			}

			expect(await resolver.signUp(newUserInput)).toEqual(expectedResult)
		})
	})
})
