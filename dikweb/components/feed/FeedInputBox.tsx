import { Avatar, IconButton } from '@material-ui/core'
import styled from 'styled-components'
import Button from '../button/Button'

export default function FeedInputBox() {
	return (
		<FeedInputBoxWrapper>
			{/* Avatar */}
			<FeedInputBoxAvatarWrapper>
				<IconButton>
					<Avatar />
				</IconButton>
			</FeedInputBoxAvatarWrapper>

			{/* Box Button */}
			<Button
				type="button"
				// Element props
				text="What interest you to share this day?"
				border="none"
				textAlign="start"
				fontWeight="600"
				color="var(--font-white-800)"
				padding="14px 18px"
				borderRadius="100px"
				// Hover
				hoverBg="var(--background-dimmed-300)"
				hoverBoxShadow="var(--box-shadow)"
			/>
		</FeedInputBoxWrapper>
	)
}

const FeedInputBoxWrapper = styled.div`
	background-color: var(--background-dimmed-500);
	align-items: center;
	border-radius: 8px;
	padding: 4px 18px;
	box-shadow: var(--box-shadow);
	margin-bottom: 18px;
	display: flex;
`
const FeedInputBoxAvatarWrapper = styled.div``
