import { NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import Meta from '../components/meta/Meta'
import checkAuth from '../utils/auth'
import { UserProfileType } from '../types/profile.type'
import { useState } from 'react'
const Header = dynamic(() => import('../components/header/Header'), {
	ssr: false,
})
const IndexBody = dynamic(() => import('../components/body/IndexBody'), {
	ssr: false,
})

interface Props {
	user: UserProfileType
}

export default function Home({ user }: Props) {
	const [notificationsState, setNotificationsState] = useState<
		string | undefined
	>()

	return (
		<div>
			{/* Default Head Meta Property */}
			<Meta
				title={
					notificationsState
						? `${notificationsState} Dashboard — Dikenang`
						: 'Dashboard — Dikenang'
				}
			/>

			{/* Header Component */}
			<Header
				profile={user}
				activePath="dashboard"
				titleState={setNotificationsState}
			/>

			{/* Body Component */}
			<IndexBody profile={user} />
		</div>
	)
}

export async function getServerSideProps(ctx: NextPageContext) {
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
	 * if not exist => redirect to login page
	 * @param pass NextPageContext in order to obtain
	 * cookie when in server-side mode
	 */
	const data = await checkAuth(ctx)

	if (!data)
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		}

	return {
		props: {
			user: data,
		},
	}
}
