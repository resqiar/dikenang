import { IconButton } from '@material-ui/core'
import styled, { css } from 'styled-components'

interface Props {
	Icon: React.ElementType
	title: string
	iconColor: string
	hideTitleOnMobile?: boolean
}

export default function FeedInputButton({
	Icon,
	title,
	iconColor,
	hideTitleOnMobile,
}: Props) {
	return (
		<FeedInputButtonWrapper>
			{/* Icon */}
			<IconButton>
				<Icon style={{ color: iconColor }} />
			</IconButton>
			{/* Title */}
			<FeedInputButtonText
				hideTitleOnMobile={
					hideTitleOnMobile ? hideTitleOnMobile : false
				}
			>
				{title}
			</FeedInputButtonText>
		</FeedInputButtonWrapper>
	)
}

const FeedInputButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 2px 2px;
	cursor: pointer;
`
const FeedInputButtonText = styled.p<{ hideTitleOnMobile: boolean }>`
	color: var(--font-white-600);
	margin-left: -6px;
	font-size: 14px;
	font-weight: 500;

	&:hover {
		color: var(--font-white);
	}

	/* How mobile should behave */
	@media (max-width: 600px) {
		/* If props has hideTitleOnMobile */
		${(props) =>
			props.hideTitleOnMobile &&
			css`
				display: none;
			`}
	}
`
