import styled from 'styled-components'
import { animated, config, useSpring } from 'react-spring'
import BulletDivider from '../utils/BulletDivider'

import { Avatar, Chip, IconButton } from '@material-ui/core'

export default function Comment() {
	const commentItemFade = useSpring({
		opacity: 1,
		from: { opacity: 0 },
		config: config.gentle,
	})

	return (
		<CommentItemWrapper style={commentItemFade}>
			<IconButton>
				<Avatar />
			</IconButton>

			<CommentItemBody>
				<CommentBodyHeader>
					<CommentBodyUsername>Historyan</CommentBodyUsername>

					{/* Badge (if any) */}
					<Chip label="Tester" size="small" />
				</CommentBodyHeader>

				{/* TimeStamp */}
				<CommentTimestamp>2 Hours ago</CommentTimestamp>

				<CommentBodyText>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Maxime, totam quas sequi labore alias assumenda fugit quod
					voluptatum incidunt, optio dolores, amet esse inventore
					molestias! Vitae odit doloribus enim assumenda.
				</CommentBodyText>
			</CommentItemBody>
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
