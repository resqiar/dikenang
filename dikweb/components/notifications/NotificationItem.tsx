import { Avatar } from '@material-ui/core'
import styled from 'styled-components'
import Image from 'next/image'

interface Props {
	username?: string
	avatarSrc?: string
	type: string
	postId: string
}

export default function NotificationItem(props: Props) {
	return (
		<VoteNotificationWrapper>
			{/* Avatar */}
			<AvatarWrapper>
				<Avatar
					src={props.avatarSrc ? props.avatarSrc : undefined}
					alt={`${props.username}'s avatar`}
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
					<BodyUsername>{props.username}</BodyUsername>
					<BodyMessage>
						{props.type === 'vote'
							? 'upvoted your post about a few seconds ago'
							: 'commented on your post about a few seconds ago'}
					</BodyMessage>
				</BodyMessageWrapper>

				{/* Post preview */}
				<BodyPostPreviewWrapper>
					<StyledImage
						width={100}
						height={90}
						alt={`${props.username}'s post image`}
						layout="fixed"
						src="/images/bg.png"
						objectFit="cover"
					/>

					<PostPreviewTextWrapper>
						{/* Caption preview */}
						<PostPreviewCaption>
							Lets try #dikenang new feature! Lorem ipsum dolor
							sit, amet consectetur adipisicing elit. Alias ullam
							quia eligendi debitis modi pariatur impedit
							laudantium ducimus deserunt id?
						</PostPreviewCaption>

						{/* Views comments likes */}
						<PostPreviewDetails>
							105 views - 4 likes - 2 comments
						</PostPreviewDetails>
					</PostPreviewTextWrapper>
				</BodyPostPreviewWrapper>
			</VoteNotificationBody>

			{/* Tails */}
			<VoteNotificationTails></VoteNotificationTails>
		</VoteNotificationWrapper>
	)
}

const VoteNotificationWrapper = styled.div`
	padding: 12px 18px;
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
