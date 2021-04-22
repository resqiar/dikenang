import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PostsResolver } from './posts.resolver'
import { PostsService } from './posts.service'

describe('PostsResolver', () => {
	let resolver: PostsResolver

	const mockPostsService = {
		create: jest.fn(({ caption, author_id }) => {
			/**
			 * If caption is less than 3 chars &&
			 * author_id is not provided throw error
			 * normally this validation is taken care of
			 * by class-validators, this is only for test-cases
			 */
			if (caption.length <= 3 || author_id.length <= 0) {
				throw new BadRequestException()
			}

			return {
				id: 'c85ea02a-2d5b-4842-90dd-9e0be3235620',
				caption: caption,
				author_id: author_id,
			}
		}),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PostsResolver, PostsService],
		})
			.overrideProvider(PostsService)
			.useValue(mockPostsService)
			.compile()

		resolver = module.get<PostsResolver>(PostsResolver)
	})

	it('should be defined', () => {
		expect(resolver).toBeDefined()
	})

	describe('create new post', () => {
		it('should create a new post content', async () => {
			const expectedResult = {
				id: expect.any(String),
				caption: 'testing caption',
				author_id: 'c85ea02a-2d5b-4842-90dd-9e0be3235620',
			}

			expect(
				await resolver.createPost({
					caption: 'testing caption',
					author_id: 'c85ea02a-2d5b-4842-90dd-9e0be3235620',
				})
			).toEqual(expectedResult)
		})

		it('should throw an error if author_id is not provided', () => {
			expect(async () => {
				await resolver.createPost({
					caption: 'testing caption',
					author_id: '',
				})
			}).rejects.toThrowError(new BadRequestException())
		})
	})
})
