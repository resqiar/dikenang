import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { CreateAttachmentInput } from './dto/create-attachments.input'
import { CreatePostInput } from './dto/create-post.input'
import { Attachments } from './entities/attachments.entity'
import { Post } from './entities/post.entity'
import { PostsService } from './posts.service'

describe('PostsService', () => {
	let postService: PostsService

	// * Post Repository Mocking
	const mockPostsRepository = {
		create: jest.fn((postInput: CreatePostInput) => postInput),
		find: jest.fn(() =>
			Promise.resolve([
				{
					id: Date.now().toString(),
					caption: 'testing caption',
					created_at: Date.now().toString(),
					updated_at: Date.now().toString(),
				},
			])
		),
		findOneOrFail: jest.fn((postId: string) =>
			Promise.resolve({
				id: postId,
				caption: 'testing caption',
				author: {
					id: 'testing id',
				},
				created_at: Date.now().toString(),
				updated_at: Date.now().toString(),
			})
		),
		update: jest.fn((postId: string, postInput: CreatePostInput) => {
			Promise.resolve({
				id: postId,
				...postInput,
			})
		}),
		delete: jest.fn((_: string) => ({})),
		save: jest.fn((postInput) =>
			Promise.resolve({
				id: Date.now().toString(),
				...postInput,
			})
		),
	}

	// Attachment Repository Mocking
	const mockAttachmentsRepository = {
		create: jest.fn(
			(attachmentInput: CreateAttachmentInput) => attachmentInput
		),
		save: jest.fn((attachmentInput: CreateAttachmentInput) =>
			Promise.resolve({
				id: Date.now().toString(),
				...attachmentInput,
			})
		),
	}

	// UserService Mocking
	const mockUsersService = {
		findById: jest.fn(() => {
			return {
				id: Date.now().toString(),
				email: 'testing email',
				username: 'testing username',
			}
		}),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PostsService,
				{
					provide: getRepositoryToken(Post),
					useValue: mockPostsRepository,
				},
				{
					provide: getRepositoryToken(Attachments),
					useValue: mockAttachmentsRepository,
				},
				{
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile()

		postService = module.get<PostsService>(PostsService)
	})

	it('should be defined', () => {
		expect(postService).toBeDefined()
	})

	describe('create()', () => {
		it('should create a new post content [with attachments]', async () => {
			const currentUser = new User()
			const postsMock: CreatePostInput = {
				caption: 'testing caption',
			}

			const attachmentsMock = {
				type: 'image',
				extensions: 'png',
				uri: ['http://uri-to-resource.io'],
			}

			const expectedResult = {
				id: expect.any(String),
				caption: 'testing caption',
				author: expect.any(Object),
				attachments: attachmentsMock,
			}

			expect(
				await postService.create(
					currentUser,
					postsMock,
					attachmentsMock // optional arguments
				)
			).toEqual(expectedResult)
		})

		it('should create a new post content [without attachments]', async () => {
			const currentUser = new User()
			const postsMock: CreatePostInput = {
				caption: 'testing caption',
			}

			const expectedResult = {
				id: expect.any(String),
				caption: 'testing caption',
				author: expect.any(Object),
			}

			expect(await postService.create(currentUser, postsMock)).toEqual(
				expectedResult
			)
		})
	})

	describe('find()', () => {
		it('findAll should return an array of Post', async () => {
			const expectedResult = [
				{
					id: expect.any(String),
					caption: expect.any(String),
					created_at: expect.any(String),
					updated_at: expect.any(String),
				},
			]

			expect(await postService.findAll()).toEqual(expectedResult)
		})

		it('findById should return Post with corresponding id', async () => {
			const expectedResult = {
				id: '4500fdce-c3ff-4646-bad5-d1b7748f4b54',
				caption: expect.any(String),
				author: expect.any(Object),
				created_at: expect.any(String),
				updated_at: expect.any(String),
			}

			expect(await postService.findById(expectedResult.id)).toEqual(
				expectedResult
			)
		})
	})

	describe('update()', () => {
		it('should update post to a new provided data', async () => {
			let currentUser = new User()
			currentUser.id = 'testing id'

			const expectedResult = {
				id: '4500fdce-c3ff-4646-bad5-d1b7748f4b54',
				author: expect.any(Object),
				caption: expect.any(String),
				created_at: expect.any(String),
				updated_at: expect.any(String),
			}

			expect(
				await postService.update(currentUser, {
					id: expectedResult.id,
					caption: 'updated caption',
				})
			).toEqual(expectedResult)
		})
	})

	describe('delete()', () => {
		it('should delete post and return DeletePostResponse Object', async () => {
			let currentUser = new User()
			currentUser.id = 'testing id'

			const previous_data = {
				id: '4500fdce-c3ff-4646-bad5-d1b7748f4b54',
			}

			expect(
				await postService.remove(currentUser, previous_data.id)
			).toEqual(expect.any(Object))
		})
	})
})
