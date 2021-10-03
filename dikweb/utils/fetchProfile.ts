import { gql } from '@apollo/client'
import { NextPageContext } from 'next'
import { initializeApollo } from '../lib/apollo'

export default async function fetchProfile(ctx: NextPageContext) {
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
		const { username } = ctx.query

		const QUERY_USER_PROFILE = gql`
			query getProfile($username: String!) {
				user(username: $username) {
					id
					username
					fullname
					bio
					avatar_url
					verified
				}
			}
		`

		/**
		 * @see QUERY_USER_PROFLE
		 * Query data from graphql resolver
		 * This data will be returned to the page
		 * as a Props.
		 */
		const gqlRequest = await apolloClient.query({
			query: QUERY_USER_PROFILE,
			variables: {
				username: username,
			},
		})

		return gqlRequest.data.user
	} catch (e) {
		return null
	}
}
