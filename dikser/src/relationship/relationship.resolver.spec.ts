import { Test, TestingModule } from '@nestjs/testing'
import { User } from '../users/entities/user.entity'
import { CreateRelationshipInput } from './dto/create-relationship.input'
import { DeleteRelationshipResponse } from './dto/delete-relationship.dto'
import { Relationship } from './entities/relationship.entity'
import { RelationshipResolver } from './relationship.resolver'
import { RelationshipService } from './relationship.service'

describe('RelationshipResolver', () => {
	let resolver: RelationshipResolver

	const mockRelationshipService = {
		create: jest.fn(
			(
				_currentUserId: string,
				createRelationshipInput: CreateRelationshipInput
			) => {
				return { ...createRelationshipInput }
			}
		),
		delete: jest.fn((_currentUserId: string) => {
			const previous_data = new Relationship()
			return new DeleteRelationshipResponse(previous_data, 'DELETED', 200)
		}),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [RelationshipResolver, RelationshipService],
		})
			.overrideProvider(RelationshipService)
			.useValue(mockRelationshipService)
			.compile()

		resolver = module.get<RelationshipResolver>(RelationshipResolver)
	})

	it('should be defined', () => {
		expect(resolver).toBeDefined()
	})

	describe('create new relationship', () => {
		it('it should create new relationship and return back created values', async () => {
			const currentUser = new User()

			const expectedResult = {
				target: 'partner target id',
				description: 'example description',
				type: 'example type',
			}

			expect(
				await resolver.createRelationship(currentUser, {
					target: 'partner target id',
					description: 'example description',
					type: 'example type',
				})
			).toEqual(expectedResult)
		})
	})

	describe('delete relationship', () => {
		it('it should delete relationship and return predefined delete response', async () => {
			const currentUser = new User()

			expect(
				await resolver.deleteRelationship(currentUser)
			).toBeInstanceOf(DeleteRelationshipResponse)
		})
	})
})
