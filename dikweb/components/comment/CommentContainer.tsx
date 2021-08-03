import React, { useState } from 'react'
import styled from 'styled-components'
import Icons from '../icons/Icons'
import { useSpring, animated } from 'react-spring'

import { Avatar, IconButton, TextareaAutosize } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import Comment from './Comment'

export default function CommentContainer() {
	const [inputComment, setInputComment] = useState<string | undefined>(
		undefined
	)

	// Send Button Fade Animation
	const sendButtonFade = useSpring({ opacity: inputComment ? 1 : 0 })

	return (
		<CommentContainerWrapper>
			{/* All items */}
			<CommentItemsWrapper>
				<Comment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
			</CommentItemsWrapper>

			{/* Input */}
			<CommentInputWrapper>
				<IconButton>
					<Avatar />
				</IconButton>

				<CommentInputElement
					autoFocus
					maxLength={1500}
					rowsMax={10}
					placeholder="Write something..."
					onChange={(e) => setInputComment(e.target.value)}
				/>

				{inputComment && inputComment.replace(/\s/g, '').length ? (
					<SendCommentWrapper style={sendButtonFade}>
						<Icons Icon={SendIcon} hasIconButton={true} />
					</SendCommentWrapper>
				) : undefined}
			</CommentInputWrapper>
		</CommentContainerWrapper>
	)
}

const CommentContainerWrapper = styled.div``

const CommentItemsWrapper = styled.div`
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
