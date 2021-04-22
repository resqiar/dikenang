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

@Resolver(() => Post)
export class PostsResolver {
	constructor(private readonly postsService: PostsService) {}

	@Mutation(() => Post)
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
	async findAll() {
		return await this.postsService.findAll()
	}

	@Query(() => Post, { name: 'post' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.postsService.findOne(id)
	}

	@Mutation(() => Post)
	updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
		return this.postsService.update(updatePostInput.id, updatePostInput)
	}

	@Mutation(() => Post)
	removePost(@Args('id', { type: () => Int }) id: number) {
		return this.postsService.remove(id)
	}
}
