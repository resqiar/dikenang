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
	useGetPostVotesQuery,
	useRemoveDownvoteMutation,
	useRemoveUpvoteMutation,
	useUpvoteSubscription,
} from '../../generated/graphql'
import Moment from 'moment'
import { useSpring, animated } from 'react-spring'

import { Avatar, IconButton } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpIconOutlined from '@material-ui/icons/ThumbUpOutlined'
import ThumbDownIconOutlined from '@material-ui/icons/ThumbDownOutlined'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined'
import ModeCommentIcon from '@material-ui/icons/ModeComment'
import PublicIcon from '@material-ui/icons/Public'
import LockIcon from '@material-ui/icons/Lock'
import Chip from '@material-ui/core/Chip'
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone'

interface Props {
	profile: UserProfileType
	postId: string
	username: string
	badge?: Badge
	timestamp: string
	caption: string
	commentSum: number
	avatarSrc?: string
	imageSrc?: string[]
	type: string
}

export default function FeedPost({
	profile,
	postId,
	avatarSrc,
	username,
	badge,
	timestamp,
	caption,
	imageSrc,
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

	/**
	 * @Subscriptions
	 * used as a real-time communications to provide
	 * low latency update of how many votes in current post
	 */
	const getUpvoteSubscriptions = useUpvoteSubscription({
		variables: {
			postId: postId,
		},
	})
	const getDownvoteSubscriptions = useDownvoteSubscription({
		variables: {
			postId: postId,
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
		upvotes:
			getUpvoteSubscriptions.data?.upvoteSubscription.upvoter?.length,
		from: { upvotes: 0 },
	})
	const downvoteAnimation = useSpring({
		downvotes:
			getDownvoteSubscriptions.data?.downvoteSubscription.downvoter
				?.length,
		from: { downvotes: 0 },
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
	 * @Queries
	 * Define query to the database to get the initial
	 * value of post votes, eiher upvotes or downvotes
	 */
	const getPostVotes = useGetPostVotesQuery({
		variables: {
			postId: postId,
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
				if (value.id === profile.id) {
					setIsUpvoted(true)
				}
			})
		}
		const checkDownvoted = async () => {
			if (!getPostVotes.data) return null
			getPostVotes.data?.post?.downvoter?.map((value) => {
				if (value.id === profile.id) {
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
			if (captionRef.current.clientHeight >= 350) {
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
					postId: postId,
				},
			})
			setIsDownvoted(false)
		}

		// If post is not upvoted yet
		if (!isUpvoted) {
			// Add Upvote
			addUpvote({
				variables: {
					postId: postId,
				},
			})
			setIsUpvoted(true)
		} else {
			// If already upvoted, remove Upvote
			removeUpvote({
				variables: {
					postId: postId,
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
					postId: postId,
				},
			})
			setIsUpvoted(false)
		}

		// If not Downvoted yet,
		if (!isDownvoted) {
			// Add Downvote
			addDownvote({
				variables: {
					postId: postId,
				},
			})
			setIsDownvoted(true)
		} else {
			// If already downvoted, remove Downvote
			removeDownvote({
				variables: {
					postId: postId,
				},
			})
			setIsDownvoted(false)
		}
	}

	return (
		<FeedPostWrapper style={fade}>
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
						<VotesAltText>{commentSum}</VotesAltText>
					</VotesWrapper>
				</FeedPostVotes>

				{/* Votes || Comment */}
				<FeedPostButtonWrapper>
					{/* Upvotes */}
					<Icons
						Icon={!isUpvoted ? ThumbUpIconOutlined : ThumbUpIcon}
						color={!isUpvoted ? undefined : 'var(--color-primary)'}
						hasIconButton={true}
						onClickCallback={handleUpvotes}
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
					/>

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
