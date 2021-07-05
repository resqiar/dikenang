import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { CreateRelationshipInput } from './dto/create-relationship.input'
import { DeleteRelationshipResponse } from './dto/delete-relationship.dto'
import { Relationship } from './entities/relationship.entity'
import { RelationshipService } from './relationship.service'

describe('RelationshipService', () => {
	let service: RelationshipService

	const mockRelationshipRepository = {
		create: jest.fn(
			(createRelationshipInput: CreateRelationshipInput) =>
				createRelationshipInput
		),
		save: jest.fn((createRelationshipInput: CreateRelationshipInput) => {
			return {
				id: 'example id',
				...createRelationshipInput,
			}
		}),
		findOneOrFail: jest.fn((relationshipId: string) => {
			return {
				id: relationshipId,
				description: 'example description',
				type: 'example type',
				partnership: [User, User],
			}
		}),
		delete: jest.fn((_relationshipId: string) => {
			const previous_data = new Relationship()
			return new DeleteRelationshipResponse(previous_data, 'DELETED', 200)
		}),
	}
	const mockUsersService = {
		findById: jest.fn(() => {
			const user = new User()
			user.relationship = new Relationship()
			return user
		}),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				RelationshipService,
				{
					provide: getRepositoryToken(Relationship),
					useValue: mockRelationshipRepository,
				},
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile()

		service = module.get<RelationshipService>(RelationshipService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('create new relationship', () => {
		it('it should create new relationship and return the created values', async () => {
			const userId = 'example id'

			const expectedResult = {
				id: expect.any(String),
				description: 'example description',
				type: 'example type',
				partnership: expect.any(Array),
			}

			expect(
				await service.create(userId, {
					target: 'example target id',
					description: 'example description',
					type: 'example type',
				})
			).toEqual(expectedResult)
		})
	})

	describe('find relationship', () => {
		it('it should return relationship matches specified id', async () => {
			const relationshipId = 'example id'

			const expectedResult = {
				id: 'example id',
				description: 'example description',
				type: 'example type',
				partnership: expect.any(Array),
			}

			expect(await service.findById(relationshipId)).toEqual(
				expectedResult
			)
		})
	})

	describe('delete relationship', () => {
		it('it should delete the relationship and return pre defined response', async () => {
			const userId = 'example user id'

			expect(await service.delete(userId)).toBeInstanceOf(
				DeleteRelationshipResponse
			)
		})
	})
})
