import { IconButton } from '@material-ui/core'
import styled from 'styled-components'

interface Props {
	Icon: React.ElementType
	title: string
	iconColor: string
}

export default function FeedInputButton({ Icon, title, iconColor }: Props) {
	return (
		<FeedInputButtonWrapper>
			{/* Icon */}
			<IconButton>
				<Icon style={{ color: iconColor }} />
			</IconButton>
			{/* Title */}
			<FeedInputButtonText>{title}</FeedInputButtonText>
		</FeedInputButtonWrapper>
	)
}

const FeedInputButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 2px 2px;
	cursor: pointer;
`
const FeedInputButtonText = styled.p`
	color: var(--font-white-600);
	margin-left: -6px;
	font-size: 14px;
	font-weight: 500;

	&:hover {
		color: var(--font-white);
	}
`
