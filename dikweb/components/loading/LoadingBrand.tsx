import styled from 'styled-components'

interface Props {
	text?: string
}

export default function LoadingBrand({ text }: Props) {
	return (
		<LoadingBrandWrapper>
			<LoadingTextElement>{text ? text : 'dikenang.'}</LoadingTextElement>
		</LoadingBrandWrapper>
	)
}

const LoadingBrandWrapper = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--background-dimmed);
`
const LoadingTextElement = styled.h1`
	font-size: 48px;
	position: relative;

	/* Fallback: Set a background color. */
	background: rgb(255, 105, 180);
	background: linear-gradient(
		90deg,
		rgba(0, 0, 0, 0.7),
		rgba(255, 105, 180, 1) 15%,
		rgba(0, 0, 255, 1) 68%,
		rgba(0, 0, 0, 0.7)
	);

	/* Set the background size and repeat properties. */
	background-size: 80%;
	background-repeat: no-repeat;

	/* Use the text as a mask for the background. */
	/* This will show the gradient as a text color rather than element bg. */
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	-moz-background-clip: text;
	-moz-text-fill-color: transparent;
	animation: animate 3s linear infinite;
	-webkit-text-fill-color: rgba(255, 255, 255, 0);
`
