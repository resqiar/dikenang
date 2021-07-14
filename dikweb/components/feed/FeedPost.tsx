import { useLayoutEffect, useRef, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import Image from 'next/image'
import styled from 'styled-components'
import Icons from '../icons/Icons'
import RichTextEditor from '../utils/RichTextEditor'
import BulletDivider from '../utils/BulletDivider'
import { Badge } from '../../generated/graphql'
import Moment from 'moment'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpIconOutlined from '@material-ui/icons/ThumbUpOutlined'
import ThumbDownIconOutlined from '@material-ui/icons/ThumbDownOutlined'
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined'
import ModeCommentIcon from '@material-ui/icons/ModeComment'
import PublicIcon from '@material-ui/icons/Public'
import LockIcon from '@material-ui/icons/Lock'
import Chip from '@material-ui/core/Chip'
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone'

interface Props {
	username: string
	badge?: Badge
	timestamp: string
	caption: string
	upSum: number
	downSum: number
	commentSum: number
	avatarSrc?: string
	imageSrc?: string[]
	type: string
}

export default function FeedPost({
	avatarSrc,
	username,
	badge,
	timestamp,
	caption,
	imageSrc,
	upSum,
	commentSum,
	type,
}: Props) {
	/**
	 * This ref attached to CaptionWrapper
	 * which will has dynamic height based on
	 * what have been written by user
	 */
	const captionRef = useRef()

	/**
	 * This hook is used to determine if
	 * Caption Wrapper has height more than 350px,
	 * if yes, truncate will be true and vise versa.
	 * Default value is false
	 */
	const [truncate, setTruncate] = useState<boolean>(false)

	useLayoutEffect(() => {
		/**
		 * When component mounted,
		 * Check if caption component has height
		 * More than 350px, if yes truncate and show "Read More" button
		 */
		if (captionRef.current) {
			// @ts-ignore considering this next line will always be defined
			if (captionRef.current.clientHeight >= 350) {
				setTruncate(true)
			}
		}
	}, [])

	return (
		<FeedPostWrapper>
			<FeedPostHeaderWrapper>
				<FeedPostProfile>
					{/* Post Avatar */}
					<IconButton>
						<Avatar variant="square" src={avatarSrc} />
					</IconButton>

					<FeedPostHeaderText>
						<FeedPostHeaderUsernameWrapper>
							{/* Post Username */}
							<FeedPostProfileH4>{username}</FeedPostProfileH4>

							{/* Badge (if any) */}
							{badge ? (
								<Chip
									label={badge.label}
									variant={badge.variant as any}
									size="small"
									style={{
										height: '21px',
										color: `${badge.color}`,
										background: `${badge.background}`,
										borderColor: `${badge.border}`,
									}}
								/>
							) : undefined}
						</FeedPostHeaderUsernameWrapper>

						<FeedPostTypeTimestampWrapper>
							{/* Post Type Icon */}
							<Icons
								Icon={type === 'public' ? PublicIcon : LockIcon}
								hasIconButton={false}
								size={18}
							/>

							{/* Bullet Divider  */}
							<BulletDivider
								color="var(--font-white-300)"
								margin="0px 0px 0px -2px"
							/>

							{/* Post TimeStamp */}
							<FeedPostTimeStamp>
								{Moment(timestamp).fromNow()}
							</FeedPostTimeStamp>
						</FeedPostTypeTimestampWrapper>
					</FeedPostHeaderText>
				</FeedPostProfile>
			</FeedPostHeaderWrapper>

			<FeedPostBody>
				{/* Caption In read-only Rich Text Editor */}
				<CaptionWrapper ref={captionRef} isTruncated={truncate}>
					<RichTextEditor
						readOnly={true}
						initialState={caption}
						maxHeight="100%"
						mobileMaxHeight="100%"
						margin="-24px 0px 0px 0px"
						padding="0px 8px 0px 8px"
					/>
				</CaptionWrapper>

				{/* If Caption is More than 350px */}
				{truncate ? (
					<ReadMoreChipWrapper>
						<Chip
							icon={<ExpandMoreTwoToneIcon />}
							label="Read More..."
							color="primary"
							onClick={() => setTruncate(false)}
						/>
					</ReadMoreChipWrapper>
				) : undefined}

				{/* Post Attachments */}
				<FeedPostAttachments>
					{/* If attachments contains image */}
					{imageSrc && (
						<Image
							width={800}
							height={700}
							alt={`${username}'s post image`}
							layout="responsive"
							src={imageSrc[0]}
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
const FeedPostHeaderUsernameWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
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
const FeedPostTypeTimestampWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 2px;
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

const CaptionWrapper = styled.div<{ ref?: any; isTruncated?: boolean }>`
	max-height: ${(props) => (props.isTruncated ? '350px' : '100%')};
	overflow: hidden;
`
const ReadMoreChipWrapper = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 8px;
`
const FeedPostAttachments = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	padding-top: 2px;
	margin-top: -4px;
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
