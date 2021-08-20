import { gql } from '@apollo/client'
import { NextPageContext } from 'next'
import { initializeApollo } from '../lib/apollo'

export default async function fetchPost(ctx: NextPageContext) {
	try {
		/**
		 * Apollo Configuration
		 * Initialize apollo client on the server
		 * and pass NextPageContext in order to send
		 * cookie to server
		 * @see apollo.ts for more
		 */
		const apolloClient = initializeApollo(ctx)

		// get variables from query url
		const { author, postid } = ctx.query

		const QUERY_POST_DETAIL = gql`
			query getPostById($postId: String!, $username: String!) {
				postByAuthorAndId(postId: $postId, username: $username) {
					id
					type
					caption
					attachments {
						uri
					}
					author {
						id
						username
						avatar_url
						badges {
							id
							label
							variant
							color
							background
							border
						}
					}
					created_at
				}
			}
		`

		/**
		 * @see QUERY_POST_DETAIL
		 * Query data from graphql resolver
		 * This data will be returned to the page
		 * as a Props.
		 */
		const gqlRequest = await apolloClient.query({
			query: QUERY_POST_DETAIL,
			variables: {
				postId: postid,
				username: author,
			},
		})

		return gqlRequest.data.postByAuthorAndId
	} catch (e) {
		return null
	}
}
