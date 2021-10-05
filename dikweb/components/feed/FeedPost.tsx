import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { UserProfileType } from '../../types/profile.type'
import Image from 'next/image'
import styled from 'styled-components'
import Icons from '../icons/Icons'
import RichTextEditor from '../utils/RichTextEditor'
import BulletDivider from '../utils/BulletDivider'
import {
	Badge,
	useAddDownvoteMutation,
	useAddUpvoteMutation,
	useDownvoteSubscription,
	useGetPostCommentsQuery,
	useGetPostVotesQuery,
	useGetPublicFeedReachsQuery,
	useRemoveDownvoteMutation,
	useRemoveUpvoteMutation,
	useSetCurrentPostReachMutation,
	useTotalCommentsSubscriptionSubscription,
	useUpvoteSubscription,
} from '../../generated/graphql'
import Moment from 'moment'
import { useSpring, animated } from 'react-spring'
import CommentContainer from '../comment/CommentContainer'
import FeedViewsTooltip from '../utils/tooltip/FeedViewsTooltip'
import FeedMoreItem from './FeedMoreItem'
import Viewer from '../utils/image/Viewer'

import { Avatar, IconButton } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpIconOutlined from '@material-ui/icons/ThumbUpOutlined'
import ThumbDownIconOutlined from '@material-ui/icons/ThumbDownOutlined'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import ModeCommentIcon from '@material-ui/icons/ModeComment'
import PublicIcon from '@material-ui/icons/Public'
import LockIcon from '@material-ui/icons/Lock'
import Chip from '@material-ui/core/Chip'
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone'
import { getReadingTime } from '../../utils/readingTime'

interface Props {
	profile: UserProfileType
	onRefecthCallback: () => void
	postId: string
	authorId: string
	username: string
	badge?: Badge
	timestamp: string
	caption: string
	commentSum: number
	avatarSrc?: string
	imageSrc?: string[]
	type: string
}

export default function FeedPost(props: Props) {
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

	/**
	 * @Subscriptions
	 * used as a real-time communications to provide
	 * low latency update of how many votes in current post
	 */
	const getUpvoteSubscriptions = useUpvoteSubscription({
		variables: {
			postId: props.postId,
		},
	})
	const getDownvoteSubscriptions = useDownvoteSubscription({
		variables: {
			postId: props.postId,
		},
	})

	// React-spring fade animation hook
	const fade = useSpring({ from: { opacity: 0 }, opacity: 1 })
	/**
	 * @Animation
	 * These two hooks below is used to animate votes
	 * When update is called, these hooks will take care
	 * of animation when number changes
	 */
	const upvoteAnimation = useSpring({
		upvotes: getUpvoteSubscriptions.data?.upvoteSubscription.upvotes,
		from: { upvotes: 0 },
		config: { mass: 1, tension: 500, friction: 0, clamp: true },
	})
	const downvoteAnimation = useSpring({
		downvotes:
			getDownvoteSubscriptions.data?.downvoteSubscription.downvotes,
		from: { downvotes: 0 },
		config: { mass: 1, tension: 500, friction: 0, clamp: true },
	})

	/**
	 * State to keep track of votes,
	 * e.g, if user already voted current post,
	 * then bind to correspond state value
	 */
	const [isUpvoted, setIsUpvoted] = useState<boolean>(false)
	const [isDownvoted, setIsDownvoted] = useState<boolean>(false)

	/**
	 * @Mutations
	 * Define mutations to update
	 * Votes either upvotes or downvotes
	 */
	const [addUpvote] = useAddUpvoteMutation()
	const [removeUpvote] = useRemoveUpvoteMutation()
	const [addDownvote] = useAddDownvoteMutation()
	const [removeDownvote] = useRemoveDownvoteMutation()

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

	useEffect(() => {
		/**
		 * Check if post is already voted or not
		 * If current user is already upvoted, then set upvoted to true
		 * If current user is already downvoted, then set downvoted to true
		 */
		const checkUpvoted = async () => {
			if (!getPostVotes.data) return null
			getPostVotes.data?.post?.upvoter?.map((value) => {
				if (value.id === props.profile.id) {
					setIsUpvoted(true)
				}
			})
		}
		const checkDownvoted = async () => {
			if (!getPostVotes.data) return null
			getPostVotes.data?.post?.downvoter?.map((value) => {
				if (value.id === props.profile.id) {
					setIsDownvoted(true)
				}
			})
		}
		checkUpvoted()
		checkDownvoted()
	}, [getPostVotes.data])

	useLayoutEffect(() => {
		/**
		 * When component mounted,
		 * Check if caption component has height
		 * More than 350px, if yes truncate and show "Read More" button
		 */
		if (captionRef.current) {
			// @ts-ignore considering this next line will always be defined
			if (captionRef.current.clientHeight >= 500) {
				setTruncate(true)
			}
		}
	}, [])

	/**
	 * This function is used to handle Upvotes
	 * e.g if user clicks "Upvote", it should
	 * add Upvote to the post or remove the upvote
	 */
	const handleUpvotes = () => {
		// If post is already downvoted
		if (isDownvoted) {
			// Remove downvote first
			removeDownvote({
				variables: {
					postId: props.postId,
				},
			})
			setIsDownvoted(false)
		}

		// If post is not upvoted yet
		if (!isUpvoted) {
			// Add Upvote
			addUpvote({
				variables: {
					postId: props.postId,
				},
			})
			setIsUpvoted(true)
		} else {
			// If already upvoted, remove Upvote
			removeUpvote({
				variables: {
					postId: props.postId,
				},
			})
			setIsUpvoted(false)
		}
	}

	/**
	 * This function is used to handle Downvotes
	 * e.g if user clicks "Downvote", it should
	 * add Downvote to the post or remove the Downvote
	 */
	const handleDownvotes = () => {
		// If post is already upvoted
		if (isUpvoted) {
			// Remove Upvote first
			removeUpvote({
				variables: {
					postId: props.postId,
				},
			})
			setIsUpvoted(false)
		}

		// If not Downvoted yet,
		if (!isDownvoted) {
			// Add Downvote
			addDownvote({
				variables: {
					postId: props.postId,
				},
			})
			setIsDownvoted(true)
		} else {
			// If already downvoted, remove Downvote
			removeDownvote({
				variables: {
					postId: props.postId,
				},
			})
			setIsDownvoted(false)
		}
	}

	/**
	 * State to keep track of comment container,
	 * e.g, if open comments container,
	 * then render comment container and comment items
	 */
	const [openComment, setOpenComment] = useState<boolean>(false)

	// Comment section toggle fade
	const commentContainerFade = useSpring({ opacity: openComment ? 1 : 0 })

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

	/**
	 * @Subscriptions
	 * used as a real-time communications to provide
	 * low latency update of how many comments in the current post
	 */
	const getTotalCommentSubscription =
		useTotalCommentsSubscriptionSubscription({
			variables: {
				postId: props.postId,
			},
		})

	/**
	 * @Animation
	 * This hooks below is used to animate comments
	 * When update is called, these hooks will take care
	 * of animation when number changes
	 */
	const commentsAnimation = useSpring({
		comments:
			getTotalCommentSubscription.data?.commentsSubscription.commentsSum,
		from: { comments: 0 },
		config: { mass: 1, tension: 500, friction: 0, clamp: true },
	})

	/**
	 * state to keep track whether to
	 * show or close the image viewer
	 * @see Viewer.tsx
	 */
	const [openImageViewer, setOpenImageViewer] = useState<boolean>(false)

	const readingTime = getReadingTime(props.caption)

	return (
		<FeedPostWrapper style={fade}>
			<FeedPostHeaderWrapper>
				<FeedPostProfile>
					{/* Post Avatar */}
					<IconButton aria-label="Author">
						<Avatar
							variant="square"
							src={props.avatarSrc}
							alt={`${props.username}'s avatar profile picture`}
						/>
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

							{/* Post Reading Time */}
							<FeedPostTimeStamp>
								{readingTime.minute > 0
									? `— ${readingTime.minute} ${
											readingTime.minute > 1
												? 'minutes'
												: 'minute'
									  } ${readingTime.second} ${
											readingTime.second > 1
												? 'seconds'
												: 'second'
									  } reading time`
									: `— ${readingTime.second} ${
											readingTime.second > 1
												? 'seconds'
												: 'second'
									  } reading time`}
							</FeedPostTimeStamp>
						</FeedPostTypeTimestampWrapper>
					</FeedPostHeaderText>
				</FeedPostProfile>

				{/* POST MORE ITEM COMPONENT */}
				<FeedMoreItem
					profile={props.profile}
					postAuthorId={props.authorId}
					postAuthorUsername={props.username}
					postId={props.postId}
					onRefecthCallback={() => props.onRefecthCallback()}
				/>
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
						<ImageAttachmentsWrapper>
							<Image
								width={2}
								height={1.5}
								alt={`${props.username}'s post image`}
								layout="responsive"
								src={props.imageSrc[0]}
								objectFit="cover"
								onClick={() => setOpenImageViewer(true)}
							/>
						</ImageAttachmentsWrapper>
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
								{/* CHECK IF THERE IS SUBSCRIPTIONS DATA */}
								{/* IF THERE IS NO SUBSCRIPTIONS DATA, FALLBACK TO INITIAL DATA */}
								{getUpvoteSubscriptions.data
									? upvoteAnimation.upvotes.to((value) =>
											Math.floor(value)
									  )
									: getPostVotes.data?.post.upvoter?.length}
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
								{/* CHECK IF THERE IS SUBSCRIPTIONS DATA */}
								{/* IF THERE IS NO SUBSCRIPTIONS DATA, FALLBACK TO INITIAL DATA */}
								{getDownvoteSubscriptions.data
									? downvoteAnimation.downvotes.to((value) =>
											Math.floor(value)
									  )
									: getPostVotes.data?.post.downvoter?.length}
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
								{/* CHECK IF THERE IS SUBSCRIPTIONS DATA */}
								{/* IF THERE IS NO SUBSCRIPTIONS DATA, FALLBACK TO INITIAL DATA */}
								{getTotalCommentSubscription.data
									? commentsAnimation.comments.to((value) =>
											Math.floor(value)
									  )
									: getPostInitialComments.data
											?.getPostComments?.length}
							</VotesAltText>
						</VotesWrapper>
					</FeedPostVotes>
				</FooterAltWrapper>

				{/* Votes || Comment */}
				<FeedPostButtonWrapper>
					{/* Upvotes */}
					<Icons
						Icon={!isUpvoted ? ThumbUpIconOutlined : ThumbUpIcon}
						color={!isUpvoted ? undefined : 'var(--color-primary)'}
						hasIconButton={true}
						onClickCallback={handleUpvotes}
						label="Upvote"
					/>

					{/* Downvotes */}
					<Icons
						Icon={
							!isDownvoted ? ThumbDownIconOutlined : ThumbDownIcon
						}
						color={
							!isDownvoted ? undefined : 'var(--color-primary)'
						}
						hasIconButton={true}
						onClickCallback={handleDownvotes}
						label="Downvote"
					/>

					{/* Commment */}
					<Icons
						Icon={
							!openComment
								? ModeCommentOutlinedIcon
								: InsertCommentIcon
						}
						hasIconButton={true}
						onClickCallback={() => {
							if (!openComment) return setOpenComment(true)
							setOpenComment(false)
						}}
						label="Show comments"
					/>
				</FeedPostButtonWrapper>
			</FeedPostFooter>

			{/* Feed Comment Component */}
			{openComment ? (
				<CommentSection style={commentContainerFade}>
					<CommentContainer
						postId={props.postId}
						profile={props.profile}
					/>
				</CommentSection>
			) : undefined}
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
	margin: 2px 2px 0px 2px;
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
`

const ImageAttachmentsWrapper = styled.div`
	position: relative;
	padding-top: 18px;
	margin-top: -4px;
	cursor: pointer;
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

const CommentSection = styled(animated.div)``
