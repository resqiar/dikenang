import { NextPageContext } from 'next'
import IndexBody from '../components/body/IndexBody'
import Header from '../components/header/Header'
import Meta from '../components/meta/Meta'
import { DummyPostType } from '../types/dummypost.type'
import { dummy } from './api/dummy/dummy'
import checkAuth from '../utils/auth'
import { UserProfileType } from '../types/profile.type'

interface Props {
	posts: DummyPostType
	user: UserProfileType
}

export default function Home({ posts, user }: Props) {
	return (
		<div>
			{/* Default Head Meta Property */}
			<Meta title="Dashboard — dikenang" />

			{/* Header Component */}
			<Header profile={user} />

			{/* Body Component */}
			<IndexBody posts={posts} profile={user} />
		</div>
	)
}

export async function getServerSideProps(ctx: NextPageContext) {
	/**
	 * Dummmy Post just yet
	 * @NO APi calls
	 */
	const posts = dummy
	/**
	 * Check if cookie is exist
	 * if not => redirect to login page.
	 */
	const cookie = ctx.req?.headers.cookie

	if (cookie === undefined)
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		}

	/**
	 * Get User data profile from server
	 * if not exist => redirect to login
	 */
	const data = await checkAuth(ctx)

	if (!data)
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		}

	return { props: { posts: posts, user: data } }
}
