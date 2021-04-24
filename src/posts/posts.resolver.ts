import {
	Resolver,
	Query,
	Mutation,
	Args,
	Int,
	Parent,
	ResolveField,
} from '@nestjs/graphql'
import { PostsService } from './posts.service'
import { Post } from './entities/post.entity'
import { CreatePostInput } from './dto/create-post.input'
import { UpdatePostInput } from './dto/update-post.input'
import { User } from 'src/users/entities/user.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/guards/gql-jwt.guard'
import { CurrentUser } from 'src/shared/decorators/current-user.decorator'

@Resolver(() => Post)
export class PostsResolver {
	constructor(private readonly postsService: PostsService) {}

	@Mutation(() => Post)
	@UseGuards(GqlAuthGuard)
	async createPost(
		@Args('createPostInput') createPostInput: CreatePostInput
	): Promise<Post> {
		return await this.postsService.create(createPostInput)
	}

	@ResolveField(() => User, { name: 'author' })
	async getAuthor(@Parent() post: Post): Promise<User> {
		/**
		 * @Usage is to get parent field from Post object
		 * Use them to get the author of the post.
		 * @Return User object
		 */
		return await this.postsService.getAuthor(post.author_id)
	}

	@Query(() => [Post], { name: 'posts' })
	async findAll(): Promise<Post[]> {
		return await this.postsService.findAll()
	}

	@Query(() => Post, { name: 'post' })
	async findById(@Args('id') id: string): Promise<Post> {
		return await this.postsService.findById(id)
	}

	@Mutation(() => Post)
	@UseGuards(GqlAuthGuard)
	async updatePost(
		@CurrentUser() user: User,
		@Args('updatePostInput') updatePostInput: UpdatePostInput
	) {
		return await this.postsService.update(user, updatePostInput)
	}

	@Mutation(() => Post)
	removePost(@Args('id', { type: () => Int }) id: number) {
		return this.postsService.remove(id)
	}
}
