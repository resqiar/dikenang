import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Router from 'next/router'
import styled from 'styled-components'
import Icons from '../icons/Icons'
import RichTextEditor from '../utils/RichTextEditor'
import BulletDivider from '../utils/BulletDivider'
import {
	Badge,
	useGetPostCommentsQuery,
	useGetPostVotesQuery,
	useGetPublicFeedReachsQuery,
} from '../../generated/graphql'
import Moment from 'moment'
import { useSpring, animated } from 'react-spring'
import FeedViewsTooltip from '../utils/tooltip/FeedViewsTooltip'
import Viewer from '../utils/image/Viewer'

import { Avatar, IconButton } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpIconOutlined from '@material-ui/icons/ThumbUpOutlined'
import ThumbDownIconOutlined from '@material-ui/icons/ThumbDownOutlined'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import ModeCommentIcon from '@material-ui/icons/ModeComment'
import PublicIcon from '@material-ui/icons/Public'
import LockIcon from '@material-ui/icons/Lock'
import Chip from '@material-ui/core/Chip'
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone'

interface Props {
	postId: string
	authorId: string
	username: string
	badge?: Badge
	timestamp: string
	caption: string
	avatarSrc?: string
	imageSrc?: string[]
	type: string
}

export default function FeedPostUnauthenticated(props: Props) {
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

	// React-spring fade animation hook
	const fade = useSpring({ from: { opacity: 0 }, opacity: 1 })

	/**
	 * @Query
	 * Define query to the database to get the initial
	 * value of post reach views
	 */
	const getPostReachViews = useGetPublicFeedReachsQuery({
		variables: {
			postId: props.postId,
		},
	})

	/**
	 * @Query
	 * Define query to the database to get the initial
	 * value of post votes, eiher upvotes or downvotes
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
	 */
	const getPostInitialComments = useGetPostCommentsQuery({
		variables: {
			postId: props.postId,
		},
	})

	useLayoutEffect(() => {
		/**
		 * When component mounted,
		 * Check if caption component has height
		 * More than 500px, if yes truncate and show "Read More" button
		 */
		if (captionRef.current) {
			// @ts-ignore considering this next line will always be defined
			if (captionRef.current.clientHeight >= 500) {
				setTruncate(true)
			}
		}
	}, [])

	/**
	 * state to keep track whether to
	 * show or close the image viewer
	 * @see Viewer.tsx
	 */
	 const [openImageViewer, setOpenImageViewer] = useState<boolean>(false)

	return (
		<FeedPostWrapper style={fade}>
			<FeedPostHeaderWrapper>
				<FeedPostProfile>
					{/* Post Avatar */}
					<IconButton>
						<Avatar variant="square" src={props.avatarSrc} />
					</IconButton>

					<FeedPostHeaderText>
						<FeedPostHeaderUsernameWrapper>
							{/* Post Username */}
							<FeedPostProfileH4>
								{props.username}
							</FeedPostProfileH4>

							{/* Badge (if any) */}
							{props.badge ? (
								<Chip
									label={props.badge.label}
									variant={props.badge.variant as any}
									size="small"
									style={{
										color: `${props.badge.color}`,
										background: `${props.badge.background}`,
										borderColor: `${props.badge.border}`,
									}}
								/>
							) : undefined}
						</FeedPostHeaderUsernameWrapper>

						<FeedPostTypeTimestampWrapper>
							{/* Post Type Icon */}
							<Icons
								Icon={
									props.type === 'public'
										? PublicIcon
										: LockIcon
								}
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
								{Moment(props.timestamp).fromNow()}
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
						initialState={props.caption}
						maxHeight="100%"
						mobileMaxHeight="100%"
						margin="-20px 0px 0px 0px"
						padding="0px 8px 0px 8px"
					/>
					<FadeEffect isTruncated={truncate} />
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
					{props.imageSrc && (
						<Image
							width={800}
							height={700}
							alt={`${props.username}'s post image`}
							layout="responsive"
							src={props.imageSrc[0]}
							objectFit="cover"
						/>
					)}

					{/* Image viewer */}
					{props.imageSrc && (
						<Viewer
							imgs={[{ src: props.imageSrc[0] }]}
							open={openImageViewer}
							onCloseCallback={() => setOpenImageViewer(false)}
						/>
					)}
				</FeedPostAttachments>
			</FeedPostBody>

			<FeedPostFooter>
				<FooterAltWrapper>
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
							<VotesAltText style={fade}>
								{getPostVotes.data?.post.upvoter?.length}
							</VotesAltText>
						</VotesWrapper>

						<VotesWrapper>
							{/* Downvotes */}
							<ThumbDownAltIcon
								style={{
									color: 'var(--font-white-500)',
									width: '15px',
									height: '18px',
									border: 'none',
								}}
							/>
							<VotesAltText style={fade}>
								{getPostVotes.data?.post.downvoter?.length}
							</VotesAltText>
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
							<VotesAltText>
								{
									getPostInitialComments.data?.getPostComments
										?.length
								}
							</VotesAltText>
						</VotesWrapper>
					</FeedPostVotes>

					{/* VIEWS TOOLTIP */}
					<FeedViewsTooltip>
						{/* Reach Views Alt */}
						<FeedReachViews>
							<FeedReachViewsText>
								{/* GET VIEWS DATA */}
								{getPostReachViews?.data?.getPostReachs}
							</FeedReachViewsText>
							<FeedReachViewsSpan>
								{/* IF VIEWS MORE THAN 2, THAT MEANS PLURAL */}
								{getPostReachViews.data
									? getPostReachViews?.data?.getPostReachs >=
									  2
										? 'views'
										: 'view'
									: undefined}
							</FeedReachViewsSpan>
						</FeedReachViews>
					</FeedViewsTooltip>
				</FooterAltWrapper>

				{/* Votes || Comment */}
				<FeedPostButtonWrapper>
					{/* Upvotes */}
					<Icons
						Icon={ThumbUpIconOutlined}
						color={undefined}
						hasIconButton={true}
						onClickCallback={() => Router.push('/auth')}
					/>

					{/* Downvotes */}
					<Icons
						Icon={ThumbDownIconOutlined}
						color={undefined}
						hasIconButton={true}
						onClickCallback={() => Router.push('/auth')}
					/>

					{/* Commment */}
					<Icons
						Icon={ModeCommentOutlinedIcon}
						hasIconButton={true}
						onClickCallback={() => Router.push('/auth')}
					/>
				</FeedPostButtonWrapper>
			</FeedPostFooter>
		</FeedPostWrapper>
	)
}

const FeedPostWrapper = styled(animated.div)`
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
	max-height: ${(props) => (props.isTruncated ? '300px' : '100%')};
	position: relative;
	overflow: hidden;
`
const FadeEffect = styled.div<{ isTruncated?: boolean }>`
	display: ${(props) => (!props.isTruncated ? 'none' : undefined)};
	position: absolute;
	z-index: 1;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100%;
	background: rgb(21, 25, 32);
	background: linear-gradient(
		0deg,
		rgba(21, 25, 32, 1) 0%,
		rgba(21, 25, 32, 0) 100%
	);
`
const ReadMoreChipWrapper = styled.div`
	display: flex;
	background: transparent;
	justify-content: center;
	padding-top: 4px;
`
const FeedPostAttachments = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	padding-top: 18px;
	margin-top: -4px;
`

/**
 * Footer
 */
const FooterAltWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const FeedReachViews = styled.div`
	display: flex;
	cursor: help;
	padding: 8px 18px 2px;
	align-items: center;
`
const FeedReachViewsText = styled.p`
	color: var(--font-white-500);
	font-weight: 500;
	font-size: 12px;
	padding: 0px 4px;
`
const FeedReachViewsSpan = styled.p`
	color: var(--font-white-500);
	font-size: 12px;
	font-weight: 500;
	padding: 0px 4px 0px 0px;
`
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
const VotesAltText = styled(animated.p)`
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
