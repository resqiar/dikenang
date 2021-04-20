import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { CreatePostInput } from './dto/create-post.input'
import { UpdatePostInput } from './dto/update-post.input'
import { Post } from './entities/post.entity'

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(Post)
		private readonly postsRepository: Repository<Post>,
		private readonly usersService: UsersService
	) {}

	async create(createPostInput: CreatePostInput) {
		const createdPost = this.postsRepository.create(createPostInput)
		return await this.postsRepository.save(createdPost)
	}

	async getAuthor(id: string) {
		return await this.usersService.findById(id)
	}

	findAll() {
		return `This action returns all posts`
	}

	findOne(id: number) {
		return `This action returns a #${id} post`
	}

	update(id: number, updatePostInput: UpdatePostInput) {
		return `This action updates a #${id} post`
	}

	remove(id: number) {
		return `This action removes a #${id} post`
	}
}