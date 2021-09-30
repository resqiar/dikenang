import { Injectable } from '@nestjs/common'
import { PostsService } from '../posts/posts.service'
import { UsersService } from '../users/users.service'
import { SearchOptions } from './dto/search.dto'

@Injectable()
export class SearchService {
	constructor(
		private readonly usersService: UsersService,
		private readonly postsService: PostsService
	) {}

	async searchContent(input: string) {
		if (!input || input.length === 0) return
		/**
		 * Find target result of user input.
		 * This could be users, posts or anything on the future
		 */
		const usersResult = await this.usersService.findRelevance(input)
		const postsResult = await this.postsService.findRelevance(input)
		/**
		 * Construct the result as the type of SearchOptions
		 * so it will be easier for front-end to consume the API
		 * @see search.dto.ts
		 */
		let result: SearchOptions[] = []

		/**
		 * Find the result of users using UsersService,
		 * if the service return the value, push
		 * it into result array above with the controlled format
		 */
		if (usersResult && usersResult.length > 0) {
			usersResult.forEach((value) => {
				result.push({
					id: value.id,
					title: value.username,
					type: 'members',
					avatarUrl: value.avatar_url,
				})
			})
		}

		/**
		 * Find the result of posts using PostsService,
		 * if the service return the value, push
		 * it into result array above with the controlled format
		 */
		if (postsResult && postsResult.length > 0) {
			postsResult.forEach((value) => {
				result.push({
					id: value.id,
					title: JSON.parse(value.caption).blocks[0].text,
					type: 'stories',
				})
			})
		}

		return result
	}
}
