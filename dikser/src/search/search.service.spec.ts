import { Test, TestingModule } from '@nestjs/testing'
import { PostsService } from '../posts/posts.service'
import { UsersService } from '../users/users.service'
import { SearchOptions } from './dto/search.dto'
import { SearchService } from './search.service'

describe('SearchService', () => {
	let service: SearchService

	const mockUsersService = {
		findRelevance: jest.fn((_input: string) => {
			return [
				{
					username: 'hello',
					id: 'id',
					avatar_url: 'url',
				},
			]
		}),
	}

	const mockPostsService = {
		findRelevance: jest.fn((_input: string) => {
			return [
				{
					id: 'id',
					caption:
						'{"blocks":[{"key":"5aeg1","text":"world","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',

					author: {
						id: 'id',
						username: 'john doe',
					},
				},
			]
		}),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SearchService, UsersService, PostsService],
		})
			.overrideProvider(PostsService)
			.useValue(mockPostsService)
			.overrideProvider(UsersService)
			.useValue(mockUsersService)
			.compile()

		service = module.get<SearchService>(SearchService)
	})

	it('should return the search result in the formatted types', async () => {
		const expectedResult: SearchOptions[] = [
			{ id: 'id', title: 'hello', type: 'members', avatarUrl: 'url' },
			{ id: 'id', title: 'world', type: 'stories', author: 'john doe' },
		]

		expect(await service.searchContent('hello world')).toEqual(
			expectedResult
		)
	})
})
