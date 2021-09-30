import { Test, TestingModule } from '@nestjs/testing'
import { SearchOptions } from './dto/search.dto'
import { SearchResolver } from './search.resolver'
import { SearchService } from './search.service'

describe('SearchResolver', () => {
	let resolver: SearchResolver

	const mockSearchService = {
		searchContent: jest.fn((_input: string) => {
			return [
				{ id: '0', title: 'hello', type: 'members' },
				{ id: '0', title: 'world', type: 'stories' },
			]
		}),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SearchResolver, SearchService],
		})
			.overrideProvider(SearchService)
			.useValue(mockSearchService)
			.compile()

		resolver = module.get<SearchResolver>(SearchResolver)
	})

	it('should be defined', () => {
		expect(resolver).toBeDefined()
	})

	it('should return the search result in the formatted types', async () => {
		const expectedResult: SearchOptions[] = [
			{ id: '0', title: 'hello', type: 'members' },
			{ id: '0', title: 'world', type: 'stories' },
		]

		expect(await resolver.performSearch('hello world')).toEqual(
			expectedResult
		)
	})
})
