import styled from 'styled-components'
import Moment from 'moment'
import { animated, config, useSpring } from 'react-spring'
import { useGetUserBadgeQuery, User } from '../../generated/graphql'
import CommentMoreItem from './CommentMoreItem'
import { UserProfileType } from '../../types/profile.type'

import { Avatar, Chip, IconButton } from '@material-ui/core'

interface Props {
	profile: UserProfileType
	commentId: string
	author: User
	text: string
	timestamp: Date
}

export default function Comment(props: Props) {
	const commentItemFade = useSpring({
		opacity: 1,
		from: { opacity: 0 },
		config: config.slow,
	})

	/**
	 * @Query
	 * Define query to the database to get the user badges
	 */
	const getUserBadge = useGetUserBadgeQuery({
		variables: {
			username: props.author.username,
		},
	})

	return (
		<CommentItemWrapper style={commentItemFade}>
			<IconButton>
				<Avatar src={props.author.avatar_url as string} />
			</IconButton>

			<CommentItemBody>
				<CommentBodyHeader>
					<CommentBodyUsername>
						{props.author.username}
					</CommentBodyUsername>

					{/* Badge (if any) */}
					{getUserBadge.data?.user.badges ? (
						<Chip
							label={getUserBadge.data.user.badges[0].label}
							variant={
								getUserBadge.data.user?.badges[0].variant as any
							}
							size="small"
							style={{
								color: `${getUserBadge.data.user?.badges[0].color}`,
								background: `${getUserBadge.data.user?.badges[0].background}`,
								borderColor: `${getUserBadge.data.user?.badges[0].border}`,
							}}
						/>
					) : undefined}
				</CommentBodyHeader>

				{/* TimeStamp */}
				<CommentTimestamp>
					{Moment(props.timestamp).fromNow()}
				</CommentTimestamp>

				<CommentBodyText>{props.text}</CommentBodyText>
			</CommentItemBody>

			{/* MORE ITEM COMPONENT */}
			<CommentMoreItem
				profile={props.profile}
				commentId={props.commentId}
				authorId={props.author.id}
			/>
		</CommentItemWrapper>
	)
}

const CommentItemWrapper = styled(animated.div)`
	display: flex;
	align-items: flex-start;
	padding: 8px 0px;
	border-top: var(--border);
`

const CommentItemBody = styled.div`
	width: 100%;
	padding: 8px 4px 8px 8px;
	margin-right: 8px;
	border-radius: 8px;
`

const CommentBodyHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
`

const CommentBodyUsername = styled.p`
	color: var(--font-white-800);
	font-weight: 600;
	font-size: 14px;
`

const CommentBodyText = styled.span`
	color: var(--font-white-700);
	font-size: 14px;
`

const CommentTimestamp = styled.p`
	color: var(--font-white-300);
	font-size: 12px;
	font-weight: 500;
`
