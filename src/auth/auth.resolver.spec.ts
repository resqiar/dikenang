import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateUserInput } from '../users/dto/create-user.input'
import { UsersService } from '../users/users.service'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { LoginInputDTO } from './dto/login-input.dto'

describe('AuthResolver', () => {
	let resolver: AuthResolver

	const mockAuthService = {
		validateUser: jest.fn((username: string, password: string) => {
			const mockUser = {
				username: 'testing',
				password: 'password',
			}

			// [MOCK] if username || password mismatch
			if (
				username !== mockUser.username ||
				password !== mockUser.password
			) {
				throw new BadRequestException()
			}

			// [MOCK] return User + JWT token
			return {
				id: '1f85ac5e-4211-4b54-84cf-b202bfea344e',
				username: username,
				access_token:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpbmciLCJlbWFpbCI6InRlc3RpbmdAZXhhbXBsZS5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.ymAk4I3k0M4Qu67JCAMpyzibak66RVNwVwAH1uMEAOQ',
			}
		}),
	}
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

	describe('login', () => {
		it('should give a user new credentials key | should pass', async () => {
			const newLoginInput: LoginInputDTO = {
				username: 'testing',
				password: 'password',
			}

			const expectedResult = {
				id: expect.any(String),
				username: newLoginInput.username,
				access_token: expect.any(String),
			}

			expect(await resolver.login(newLoginInput)).toEqual(expectedResult)
		})

		it('should give an error if email/password mismatch | should not pass', () => {
			const newLoginInput: LoginInputDTO = {
				username: 'testing!', // should fail
				password: 'password!', // should fail
			}

			expect(
				async () => await resolver.login(newLoginInput)
			).rejects.toThrow(BadRequestException)
		})
	})
})
