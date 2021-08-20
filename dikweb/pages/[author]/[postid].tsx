import styled from 'styled-components'
import Header from '../../components/header/Header'
import Meta from '../../components/meta/Meta'
import checkAuth from '../../utils/auth'
import fetchPost from '../../utils/fetchPost'
import { UserProfileType } from '../../types/profile.type'
import AuthHeader from '../../components/header/AuthHeader'
import PostDetailBody from '../../components/body/PostDetailBody'
import { NextPageContext } from 'next'
import { Post } from '../../generated/graphql'

interface Props {
	user: UserProfileType
	post: Post
}

export default function PostDetailPage(props: Props) {
	return (
		<PostDetailPageWrapper>
			{/* Head Meta Property */}
			<Meta
				title={
					props.post
						? `${JSON.parse(props.post.caption).blocks[0].text} | ${
								props.post.author.username
						  }`
						: 'Whoops, There is Nothing Here!'
				}
				description={
					props.post
						? `See what ${
								props.post.author.username
						  }'s post about ${
								JSON.parse(props.post.caption).blocks[0].text
						  } in Dikenang`
						: undefined
				}
				imageURL={
					props.post ? props.post.attachments?.uri[0] : undefined
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

			{/* Body Component */}
			<PostDetailBody profile={props.user} postData={props.post} />
		</PostDetailPageWrapper>
	)
}

const PostDetailPageWrapper = styled.div``

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

	/**
	 * Get post details data to the backend
	 * if there is a post return back the data,
	 * if the post is not found/error, return null
	 * @see fetchPost.ts
	 */
	const post = await fetchPost(ctx)

	if (!data)
		return {
			props: {
				user: null,
				post: post ? post : null,
			},
		}

	return {
		props: {
			user: data,
			post: post ? post : null,
		},
	}
}
