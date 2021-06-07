import styled from 'styled-components'

export default function FeedInputDialog() {
	return <FeedInputDialogWrapper></FeedInputDialogWrapper>
}

const FeedInputDialogWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 500px;
	width: 500px;
	border-radius: 8px;
	background-color: var(--background-dimmed-500);
	padding: 8px 0px;
`
