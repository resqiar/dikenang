import { Avatar, IconButton } from '@material-ui/core'
import Image from 'next/image'
import styled from 'styled-components'
import Icons from '../icons/Icons'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import ThumbUpIconOutlined from '@material-ui/icons/ThumbUpOutlined'
import ThumbDownIconOutlined from '@material-ui/icons/ThumbDownOutlined'
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined'
import ModeCommentIcon from '@material-ui/icons/ModeComment'

interface Props {
	username: string
	timestamp: string
	caption: string
	upSum: number
	downSum: number
	commentSum: number
	avatarSrc?: string
	imageSrc?: string
}

export default function FeedPost({
	avatarSrc,
	username,
	timestamp,
	caption,
	imageSrc,
	upSum,
	downSum,
	commentSum,
}: Props) {
	return (
		<FeedPostWrapper>
			<FeedPostHeaderWrapper>
				<FeedPostProfile>
					{/* Post Avatar */}
					<IconButton>
						<Avatar variant="square" src={avatarSrc} />
					</IconButton>

					<FeedPostHeaderText>
						{/* Post Username */}
						<FeedPostProfileH4>{username}</FeedPostProfileH4>

						{/* Post TimeStamp */}
						<FeedPostTimeStamp>{timestamp}</FeedPostTimeStamp>
					</FeedPostHeaderText>
				</FeedPostProfile>
			</FeedPostHeaderWrapper>

			<FeedPostBody>
				<FeedPostCaption>{caption}</FeedPostCaption>
				{/* Post Attachments */}
				<FeedPostAttachments>
					{/* If attachments contains image */}
					{imageSrc && (
						<Image
							width="1080"
							height="1080"
							src={imageSrc}
							objectFit="cover"
						/>
					)}
				</FeedPostAttachments>
			</FeedPostBody>

			<FeedPostFooter>
				{/* Votes Alt */}
				<FeedPostVotes>
					<VotesWrapper>
						{/* Up votes */}
						<ThumbUpAltIcon
							style={{
								color: 'var(--font-white-500)',
								width: '15px',
								height: '18px',
								border: 'none',
							}}
						/>
						<VotesAltText>{upSum}</VotesAltText>
					</VotesWrapper>

					<VotesWrapper>
						{/* Down votes */}
						<ThumbDownAltIcon
							style={{
								color: 'var(--font-white-500)',
								width: '15px',
								height: '18px',
								border: 'none',
							}}
						/>
						<VotesAltText>{downSum}</VotesAltText>
					</VotesWrapper>

					<VotesWrapper>
						{/* comments */}
						<ModeCommentIcon
							style={{
								color: 'var(--font-white-500)',
								width: '15px',
								height: '18px',
								border: 'none',
							}}
						/>
						<VotesAltText>{commentSum}</VotesAltText>
					</VotesWrapper>
				</FeedPostVotes>

				{/* Votes || Comment */}
				<FeedPostButtonWrapper>
					{/* Upvotes */}
					<Icons Icon={ThumbUpIconOutlined} hasIconButton={true} />

					{/* Downvotes */}
					<Icons Icon={ThumbDownIconOutlined} hasIconButton={true} />

					{/* Commment */}
					<Icons
						Icon={InsertCommentOutlinedIcon}
						hasIconButton={true}
					/>
				</FeedPostButtonWrapper>
			</FeedPostFooter>
		</FeedPostWrapper>
	)
}

const FeedPostWrapper = styled.div`
	background-color: var(--background-dimmed-500);
	height: fit-content;
	border-radius: 8px;
	margin-top: 8px;
	width: 100%;
	box-shadow: var(--box-shadow);

	/* How mobile should behave */
	@media (max-width: 600px) {
		border-radius: 2px;
		margin-top: 4px;
	}
`
const FeedPostHeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 2px 8px;
	justify-content: space-between;
`
const FeedPostHeaderText = styled.div`
	display: flex;
	flex-direction: column;
`
const FeedPostProfile = styled.div`
	display: flex;
	align-items: center;
`
const FeedPostProfileH4 = styled.h4`
	color: var(--font-white-800);
	font-weight: bold;
	font-size: 14px;
`
const FeedPostTimeStamp = styled.p`
	color: var(--font-white-300);
	margin-top: 2px;
	font-size: 12px;
`

/**
 * Body
 */
const FeedPostBody = styled.div``
const FeedPostCaption = styled.p`
	word-break: break-word;
	white-space: pre-wrap;
	color: var(--font-white-800);
	font-size: 14px;
	padding: 4px 18px;
	text-align: justify;
	line-height: 18px;
	font-weight: 400;
`
const FeedPostAttachments = styled.div`
	width: 100%;
	height: 100%;
	object-fit: cover;
	padding-top: 8px;
`

/**
 * Footer
 */
const FeedPostFooter = styled.div`
	padding: 4px;
`
const FeedPostVotes = styled.div`
	padding: 8px 18px 2px;
	display: flex;
	align-items: center;
	gap: 6px;
`
const VotesWrapper = styled.div`
	display: flex;
	align-items: center;
`
const VotesAltText = styled.p`
	color: var(--font-white-500);
	font-size: 12px;
	padding: 0px 4px;
`

/**
 * Footer Button
 */
const FeedPostButtonWrapper = styled.div`
	display: flex;
	margin-top: 4px;
	padding: 0px 8px;
	border-top: var(--border);
`
