import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Icons from '../icons/Icons'
import { useSpring, animated } from 'react-spring'
import Comment from './Comment'
import {
	Comment as CommentType,
	useCommentsSubscriptionSubscription,
	useCreateCommentMutation,
	useGetPostCommentsQuery,
} from '../../generated/graphql'
import { UserProfileType } from '../../types/profile.type'
import scrollToBottom from '../../utils/scrollToBottom'

import { Avatar, IconButton, TextareaAutosize } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

interface Props {
	profile: UserProfileType
	postId: string
}

export default function CommentContainer(props: Props) {
	const [postComments, setPostComments] = useState<CommentType[] | []>([])
	const [inputComment, setInputComment] = useState<string | undefined>(
		undefined
	)

	// Hooks to scroll comment container to the bottom
	const commentItemsRef = useRef(undefined)

	// Send Button Fade Animation
	const sendButtonFade = useSpring({ opacity: inputComment ? 1 : 0 })

	// CommentsSubscriptions
	const commentsSubscriptions = useCommentsSubscriptionSubscription({
		variables: {
			postId: props.postId,
		},
	})

	// Get Initial Comments
	const getPostComments = useGetPostCommentsQuery({
		variables: {
			postId: props.postId,
		},
	})

	/**
	 * @Mutation
	 * Define mutations to create
	 * new comments
	 */
	const [createComment] = useCreateCommentMutation()

	useEffect(() => {
		/**
		 * This use effect is used to bind the initial data from database
		 * to array object @postComments above.
		 * The initial value is used because graphql subscriptions are
		 * not yet returning values.
		 */
		if (getPostComments.data) {
			setPostComments(
				getPostComments.data.getPostComments.comments as CommentType[]
			)

			/**
			 * This function is used to auto-scroll container to the bottom
			 * whenever initial comments or new comment are loaded.
			 * @see scrollToBottom.ts
			 */
			scrollToBottom(commentItemsRef)
		}
	}, [getPostComments.data])

	useEffect(() => {
		/**
		 * This use effect is used to bind graphql subscriptions
		 * new comment data to the array object of @postComments
		 */
		if (commentsSubscriptions.data) {
			setPostComments(
				(prev: CommentType[]) =>
					[
						...prev,
						commentsSubscriptions.data?.commentsSubscription
							.comment,
					] as CommentType[]
			)

			/**
			 * This function is used to auto-scroll container to the bottom
			 * whenever initial comments or new comment are loaded.
			 * @see scrollToBottom.ts
			 */
			scrollToBottom(commentItemsRef)
		}
	}, [commentsSubscriptions.data])

	const handleSubmitComment = async () => {
		if (!inputComment) return

		// send request to create a comment
		await createComment({
			variables: {
				createCommentInput: {
					postId: props.postId,
					text: inputComment,
				},
			},
		})

		// reset input field
		setInputComment('')
	}

	return (
		<CommentContainerWrapper>
			{/* All items */}
			<CommentItemsWrapper ref={commentItemsRef}>
				{postComments
					? postComments.map((value) => (
							<Comment
								key={value.id}
								author={value.author}
								text={value.text}
								timestamp={value.created_at}
							/>
					  ))
					: undefined}
			</CommentItemsWrapper>

			{/* Input */}
			<CommentInputWrapper>
				<IconButton>
					<Avatar src={props.profile.avatar_url} />
				</IconButton>

				<CommentInputElement
					autoFocus
					value={inputComment}
					maxLength={1500}
					rowsMax={10}
					placeholder="Write something..."
					onChange={(e) => setInputComment(e.target.value)}
				/>

				{inputComment && inputComment.replace(/\s/g, '').length ? (
					<SendCommentWrapper style={sendButtonFade}>
						<Icons
							Icon={SendIcon}
							hasIconButton={true}
							onClickCallback={handleSubmitComment}
						/>
					</SendCommentWrapper>
				) : undefined}
			</CommentInputWrapper>
		</CommentContainerWrapper>
	)
}

const CommentContainerWrapper = styled.div``

const CommentItemsWrapper = styled.div<{ ref?: any }>`
	padding: 4px 12px;
	max-height: 500px;
	overflow-y: auto;
`

const CommentInputWrapper = styled.div`
	border-top: var(--border);
	display: flex;
	padding: 0px 18px 2px 8px;
	align-items: center;
`

const CommentInputElement = styled(TextareaAutosize)`
	background: transparent;
	font-family: var(--font-family);
	color: var(--font-white-800);
	padding: 10px 18px;
	margin: 8px 0px;
	border: var(--border);
	font-size: 14px;
	text-align: start;
	outline: none;
	border-radius: 20px;
	width: 100%;
	resize: none;
	overflow-y: hidden;
`

const SendCommentWrapper = styled(animated.div)``
