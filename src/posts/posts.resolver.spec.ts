import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from 'src/users/entities/user.entity'
import { PostsResolver } from './posts.resolver'
import { PostsService } from './posts.service'

describe('PostsResolver', () => {
	let resolver: PostsResolver

	const mockPostsService = {
		create: jest.fn((currentUser: User, { caption }, attachments) => {
			/**
			 * If caption is less than 3 chars
			 * normally this validation is taken care of
			 * by class-validators, this is only for test-cases
			 */
			if (caption.length <= 3) {
				throw new BadRequestException()
			}

			return {
				id: 'c85ea02a-2d5b-4842-90dd-9e0be3235620',
				caption: caption,
				attachments: attachments ? attachments : null,
			}
		}),
		findAll: jest.fn(() => {
			return [
				{
					id: '4500fdce-c3ff-4646-bad5-d1b7748f4b54',
					caption: 'testing',
					created_at: '2021-04-20T10:18:54.372Z',
					updated_at: '2021-04-20T10:18:54.372Z',
					author_id: '7a96a8d6-dda2-4b64-8b46-e2e6f5263322',
				},
			]
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
		it('should create a new post content [without attachments]', async () => {
			const currentUser = new User()

			const expectedResult = {
				id: expect.any(String),
				caption: 'testing caption',
				attachments: null,
			}

			expect(
				await resolver.createPost(currentUser, {
					caption: 'testing caption',
				})
			).toEqual(expectedResult)
		})

		it('should create a new post content [with attachments]', async () => {
			const currentUser = new User()
			const attachmentsMock = {
				type: 'image',
				extensions: 'png',
				uri: ['http://uri-to-resource.io'],
			}

			const expectedResult = {
				id: expect.any(String),
				caption: 'testing caption',
				attachments: attachmentsMock,
			}

			expect(
				await resolver.createPost(
					currentUser,
					{
						caption: 'testing caption',
					},
					attachmentsMock // optional arguments
				)
			).toEqual(expectedResult)
		})
	})

	describe('find all posts', () => {
		it('should return an array of Post', async () => {
			const expectedResult = [
				{
					id: expect.any(String),
					caption: expect.any(String),
					author_id: expect.any(String),
					created_at: expect.any(String),
					updated_at: expect.any(String),
				},
			]

			expect(await resolver.findAll()).toEqual(expectedResult)
		})
	})
})
