import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { NextPageContext } from 'next'

export function initializeApollo(ctx: NextPageContext | null) {
	/**
	 * @ApolloClient
	 * Setup configurations for apollo client
	 */
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: createHttpLink({
			uri: `${process.env.NEXT_PUBLIC_BACKEND_URI}/graphql`,
			credentials: 'include',
			headers: {
				cookie: ctx?.req?.headers.cookie,
			},
		}),
		cache: new InMemoryCache(),
	})
}
