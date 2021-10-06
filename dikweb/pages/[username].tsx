import dynamic from 'next/dynamic'
import Meta from '../components/meta/Meta'
import checkAuth from '../utils/auth'
import { NextPageContext } from 'next'
import { UserProfileType } from '../types/profile.type'
import fetchProfile from '../utils/fetchProfile'
const Header = dynamic(() => import('../components/header/Header'), {
	ssr: false,
})
const AuthHeader = dynamic(() => import('../components/header/AuthHeader'), {
	ssr: false,
})
const ProfileBody = dynamic(() => import('../components/body/ProfileBody'), {
	ssr: false,
})

export interface ProfileDetailProps {
	id: string
	username: string
	fullname: string
	bio: string
	avatar_url?: string
	verified: boolean
}

interface Props {
	user: UserProfileType
	profileDetail: ProfileDetailProps
}

export default function myrelationship(props: Props) {
	return (
		<div>
			{/* Title */}
			<Meta
				title={
					props.profileDetail
						? `${props.profileDetail.username} | Dikenang`
						: 'Whoops, There is Nothing Here!'
				}
				description={
					props.profileDetail
						? `See ${props.profileDetail.username}'s profile in Dikenang`
						: undefined
				}
				imageURL={
					props.profileDetail
						? props.profileDetail.avatar_url
						: undefined
				}
			/>

			{/* Header Component */}
			{/* IF USER IS AUTHENTICATED, RENDER HEADER COMPONENT */}
			{/* IF NOT, RENDER UNAUTHENTICATED HEADER COMPONENT */}
			{props.user ? (
				<Header profile={props.user} />
			) : (
				<AuthHeader nonAuthPage={true} />
			)}

			{/* Body */}
			<ProfileBody profileDetail={props.profileDetail} />
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

	/**
	 * Get post details data to the backend
	 * if there is a post return back the data,
	 * if the post is not found/error, return null
	 * @see fetchPost.ts
	 */
	const profile = await fetchProfile(ctx)

	if (!data)
		return {
			props: {
				user: null,
				profileDetail: profile ? profile : null,
			},
		}

	return {
		props: {
			user: data,
			profileDetail: profile ? profile : null,
		},
	}
}
