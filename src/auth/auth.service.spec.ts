import { BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { LoginInputDTO } from './dto/login-input.dto'

describe('AuthService', () => {
	let service: AuthService

	const mockUsersService = {
		findByUsername: jest.fn((username: string) => {
			// [MOCK] return User
			return {
				id: '4500fdce-c3ff-4646-bad5-d1b7748f4b54',
				username: username,
				email: 'testing@example.com',
			}
		}),
		getCred: jest.fn(() => {
			// [MOCK] hashed password example for 'password'
			return {
				password:
					'$2b$10$yRLm5SKOAt5j7NUepnmMDua1MINxwv5hmV5d4t8rkfRvIWSQrkPRq',
			}
		}),
		update: jest.fn((id: string, updatedField: any) => {
			return {
				id: id,
				...updatedField,
			}
		}),
	}
	const mockJwtService = {
		signAsync: jest.fn((payload: Object) => {
			// [MOCK] return JWT token
			return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpbmciLCJlbWFpbCI6InRlc3RpbmdAZXhhbXBsZS5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.ymAk4I3k0M4Qu67JCAMpyzibak66RVNwVwAH1uMEAOQ'
		}),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
				{
					provide: JwtService,
					useValue: mockJwtService,
				},
			],
		}).compile()

		service = module.get<AuthService>(AuthService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('validateUser()', () => {
		it('should check if user credentials is valid', async () => {
			const newLoginInput: LoginInputDTO = {
				username: 'testing',
				password: 'password',
			}

			const expectedResult = {
				id: expect.any(String),
				access_token: expect.any(String),
			}

			expect(
				await service.validateUser(
					newLoginInput.username,
					newLoginInput.password
				)
			).toEqual(expectedResult)
		})

		it('should return an error if credentials are invalid', () => {
			const newLoginInput: LoginInputDTO = {
				username: 'testing!', // should fail
				password: 'password!', // should fail
			}

			expect(
				async () =>
					await service.validateUser(
						newLoginInput.username,
						newLoginInput.password
					)
			).rejects.toThrow(BadRequestException)
		})
	})
})
