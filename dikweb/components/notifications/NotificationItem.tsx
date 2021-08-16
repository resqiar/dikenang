import styled from 'styled-components'
import Image from 'next/image'
import Moment from 'moment'
import {
	useGetPostCaptionAndAttachmentsQuery,
	useGetPostCommentsQuery,
	useGetPostVotesQuery,
	useGetPublicFeedReachsQuery,
	useGetUserProfileQuery,
} from '../../generated/graphql'

import { Avatar } from '@material-ui/core'

interface Props {
	type: string
	authorId: string
	postId: string
	timestamp: string
	isRead?: boolean
}

export default function NotificationItem(props: Props) {
	/**
	 * @Query
	 * Define a query to the database to get the
	 * value of author of the notification.
	 * @return id | username | avatar_url
	 */
	const getAuthorNotifications = useGetUserProfileQuery({
		variables: {
			id: props.authorId,
		},
	})

	/**
	 * @Query
	 * Define query to the database to get the
	 * value of post caption and attachments data.
	 * @return caption | attachments => uri
	 */
	const getPostCaptionAndAttachments = useGetPostCaptionAndAttachmentsQuery({
		variables: {
			postId: props.postId,
		},
	})

	/**
	 * @Query
	 * Define query to the database to get the
	 * value of post reach views
	 * @return number
	 */
	const getPostReachViews = useGetPublicFeedReachsQuery({
		variables: {
			postId: props.postId,
		},
	})

	/**
	 * @Query
	 * Define query to the database to get the
	 * value of post votes, eiher upvotes or downvotes
	 * @return upvoter[] | downvoter[]
	 */
	const getPostVotes = useGetPostVotesQuery({
		variables: {
			postId: props.postId,
		},
	})

	/**
	 * @Query
	 * Define query to the database to get the initial
	 * value of post total comments
	 * @return all comments data (need refactoring)
	 */
	const getPostComments = useGetPostCommentsQuery({
		variables: {
			postId: props.postId,
		},
	})

	return (
		<VoteNotificationWrapper isRead={props.isRead}>
			{/* Avatar */}
			<AvatarWrapper>
				<Avatar
					src={
						getAuthorNotifications?.data?.getUserById.avatar_url ||
						undefined
					}
					alt={`${getAuthorNotifications?.data?.getUserById.username}'s avatar`}
					style={{
						width: '50px',
						height: '50px',
					}}
				/>
			</AvatarWrapper>

			{/* Body */}
			<VoteNotificationBody>
				{/* Message */}
				<BodyMessageWrapper>
					{/* Username */}
					<BodyUsername>
						{getAuthorNotifications?.data?.getUserById.username}
					</BodyUsername>

					{/* Notification message text */}
					<BodyMessage>
						{props.type === 'vote'
							? `upvoted your post about ${Moment(
									props.timestamp
							  ).fromNow()}`
							: `commented on your post about ${Moment(
									props.timestamp
							  ).fromNow()}`}
					</BodyMessage>
				</BodyMessageWrapper>

				{/* Post preview */}
				<BodyPostPreviewWrapper>
					{/* IF THERE IS AN ATTACHMENT IN THE POST */}
					{getPostCaptionAndAttachments.data?.post.attachments
						?.uri ? (
						<StyledImage
							width={100}
							height={90}
							layout="fixed"
							src={
								getPostCaptionAndAttachments.data?.post
									.attachments?.uri[0]
							}
							objectFit="cover"
						/>
					) : undefined}

					<PostPreviewTextWrapper>
						<PostPreviewCaption>
							{/* Caption preview */}
							{getPostCaptionAndAttachments.data?.post.caption
								? JSON.parse(
										getPostCaptionAndAttachments.data?.post
											.caption
								  ).blocks[0].text
								: undefined}
						</PostPreviewCaption>

						{/* Views || comments || likes */}
						<PostPreviewDetails>
							{getPostReachViews.data?.getPostReachs} view(s) -{' '}
							{getPostVotes.data?.post.upvoter?.length} upvote(s)
							- {getPostComments.data?.getPostComments.length}{' '}
							comment(s)
						</PostPreviewDetails>
					</PostPreviewTextWrapper>
				</BodyPostPreviewWrapper>
			</VoteNotificationBody>

			{/* Tails */}
			<VoteNotificationTails></VoteNotificationTails>
		</VoteNotificationWrapper>
	)
}

const VoteNotificationWrapper = styled.div<{ isRead?: boolean }>`
	padding: 12px 18px;
	background: ${(props) => (!props.isRead ? '#101b27' : undefined)};
	border-bottom: var(--border);
	display: flex;
	justify-content: space-between;
	align-items: center;

	// how mobile should behave
	@media (max-width: 600px) {
		margin: 0px;
		padding: 8px;
	}
`

const AvatarWrapper = styled.div`
	// how mobile should behave
	@media (max-width: 600px) {
		display: none;
	}
`

const VoteNotificationBody = styled.div`
	width: 100%;
	margin: 4px 18px;
	display: flex;
	flex-direction: column;

	// how mobile should behave
	@media (max-width: 600px) {
		margin: 0px;
	}
`

const VoteNotificationTails = styled.div``

const BodyUsername = styled.p`
	color: var(--font-white-700);
	font-weight: bold;

	// how mobile should behave
	@media (max-width: 600px) {
		font-size: 12px;
	}
`

const BodyMessage = styled.span`
	color: var(--font-white-600);

	// how mobile should behave
	@media (max-width: 600px) {
		font-size: 12px;
	}
`

const BodyMessageWrapper = styled.div`
	width: 100%;
	gap: 4px;
	display: flex;
	align-items: center;

	// how mobile should behave
	@media (max-width: 600px) {
		gap: 2px;
		justify-content: center;
	}
`

const BodyPostPreviewWrapper = styled.div`
	width: 100%;
	display: flex;
	border-radius: 20px;
	margin: 4px 0px;
	gap: 18px;
	width: 100%;
	border: 1px solid var(--font-white-100);

	// how mobile should behave
	@media (max-width: 600px) {
		gap: 2px;
	}
`

const PostPreviewTextWrapper = styled.div`
	display: flex;
	padding: 18px;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	// how mobile should behave
	@media (max-width: 600px) {
		padding: 8px;
	}
`

const StyledImage = styled(Image)`
	border-top-left-radius: 20px;
	border-bottom-left-radius: 20px;
`

const PostPreviewCaption = styled.p`
	color: var(--font-white-300);
	width: 100%;
	max-width: 400px;
	font-weight: bold;
	text-align: start;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	// how mobile should behave
	@media (max-width: 600px) {
		max-width: 70vw;
	}
`

const PostPreviewDetails = styled.p`
	color: var(--font-white-300);
	font-size: 12px;
	width: 100%;
	text-align: start;
`
