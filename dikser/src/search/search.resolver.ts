import { Resolver, Query, Args } from '@nestjs/graphql'
import { SearchService } from './search.service'
import { SearchOptions } from './dto/search.dto'

@Resolver()
export class SearchResolver {
	constructor(private readonly searchService: SearchService) {}

	@Query(() => [SearchOptions], { name: 'searchContent' })
	async performSearch(
		@Args('input') input: string
	): Promise<SearchOptions[] | undefined> {
		return await this.searchService.searchContent(input)
	}
}
