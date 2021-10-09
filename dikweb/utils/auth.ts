import { gql } from '@apollo/client'
import { NextPageContext } from 'next'
import { initializeApollo } from '../lib/apollo'

export default async function checkAuth(ctx: NextPageContext) {
	try {
		/**
		 * Apollo Configuration
		 * Initialize apollo client on the server
		 * and pass NextPageContext in order to send
		 * cookie to server
		 * @see apollo.ts for more
		 */
		const apolloClient = initializeApollo(ctx)

		/**
		 * @Usage query basic information of user upfront
		 * This information is necessary to be used in
		 * index page
		 */
		const QUERY_PROFILE = gql`
			query {
				getMyProfile {
					id
					username
					fullname
					avatar_url
				}
			}
		`

		/**
		 * @see QUERY_PROFILE
		 * Query data from graphql resolver
		 * This data will be used in index page for
		 * Initial state value
		 */
		const gqlRequest = await apolloClient.query({
			query: QUERY_PROFILE,
		})

		if (!gqlRequest) return
		return gqlRequest.data.getMyProfile
	} catch (e) {
		return
	}
}
