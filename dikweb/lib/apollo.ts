import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	OperationVariables,
	split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { NextPageContext } from 'next'

export function initializeApollo(ctx: NextPageContext | null) {
	const wsLink = process.browser
		? new WebSocketLink({
				uri: `${process.env.NEXT_PUBLIC_BACKEND_WS}/subscriptions`,
				options: {
					reconnect: true,
				},
		  })
		: null

	const httpLink = createHttpLink({
		uri: `${process.env.NEXT_PUBLIC_BACKEND_URI}/graphql`,
		credentials: 'include',
		headers: {
			cookie: ctx?.req?.headers.cookie,
		},
	})

	const link = process.browser
		? split(
				//only create the split in the browser
				// split based on operation type
				({ query }) => {
					const { kind, operation }: OperationVariables =
						getMainDefinition(query)
					return (
						kind === 'OperationDefinition' &&
						operation === 'subscription'
					)
				},
				wsLink!,
				httpLink
		  )
		: httpLink

	/**
	 * @ApolloClient
	 * Setup configurations for apollo client
	 */
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: link,
		cache: new InMemoryCache(),
	})
}
