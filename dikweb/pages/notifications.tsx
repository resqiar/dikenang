import { NextPageContext } from 'next'
import NotificationsBody from '../components/body/NotificationsBody'
import Header from '../components/header/Header'
import Meta from '../components/meta/Meta'
import { UserProfileType } from '../types/profile.type'
import checkAuth from '../utils/auth'

interface Props {
	user: UserProfileType
}

export default function NotificationPage(props: Props) {
	return (
		<div>
			{/* Title */}
			<Meta title={`Notifications — ${props.user.username}`} />

			{/* Header */}
			<Header profile={props.user} activePath="notifications" />

			{/* Body */}
			<NotificationsBody />
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
