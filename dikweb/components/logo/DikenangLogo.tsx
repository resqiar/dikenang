import styled from 'styled-components'

interface Props {
	text?: string
	onClickCallback?: () => void
}

export default function DikenangLogo(props: Props) {
	/**
	 * Dikenang Logo.
	 * Crafted by hand
	 */
	return (
		<DikenangLogoWrapper onClick={props.onClickCallback}>
			<DikenangLogoH1>
				{props.text ? props.text : 'Dikenang'}
			</DikenangLogoH1>
		</DikenangLogoWrapper>
	)
}

const DikenangLogoWrapper = styled.div`
	width: min-content;
	cursor: pointer;
`

const DikenangLogoH1 = styled.h1`
	background: linear-gradient(
		90deg,
		rgba(255, 105, 180, 1) 15%,
		rgba(0, 0, 255, 1) 68%
	);

	/* Set the background size and repeat properties. */
	background-size: 100%;
	background-position: center;
	background-repeat: no-repeat;

	/* Use the text as a mask for the background. */
	/* This will show the gradient as a text color rather than element bg. */
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	-moz-background-clip: text;
	-moz-text-fill-color: transparent;
`
