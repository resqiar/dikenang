import dynamic from 'next/dynamic'
import Header from '../components/header/Header'
import Meta from '../components/meta/Meta'
import checkAuth from '../utils/auth'
import { NextPageContext } from 'next'
import { UserProfileType } from '../types/profile.type'
const ProfileBody = dynamic(() => import('../components/body/ProfileBody'), {
	ssr: false,
})

interface Props {
	user: UserProfileType
}

export default function myrelationship(props: Props) {
	return (
		<div>
			{/* Title */}
			<Meta title="Profile — Dikenang" />

			{/* Header */}
			<Header profile={props.user} />

			{/* Body */}
			<ProfileBody />
		</div>
	)
}

export async function getServerSideProps(ctx: NextPageContext) {
	/**
	 * Check if cookie is exist
	 * if not => redirect to login page
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
	 * if not exist => redirect to login page
	 */
	const data = await checkAuth(ctx)

	if (!data)
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		}

	return { props: { user: data } }
}
