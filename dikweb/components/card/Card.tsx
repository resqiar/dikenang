import styled, { css } from 'styled-components'

interface Props {
	children?: JSX.Element | JSX.Element[]
	padding?: string
	bgColor?: string
	hasShadow?: boolean
	hoverBg?: string
	height?: string
	width?: string
}

export default function Card({
	children,
	bgColor,
	hasShadow,
	hoverBg,
	height,
	width,
	padding,
}: Props) {
	return (
		<SideBarCardWrapper
			bgColor={bgColor}
			hasShadow={hasShadow}
			hoverBg={hoverBg}
			height={height}
			width={width}
			padding={padding}
		>
			{children}
		</SideBarCardWrapper>
	)
}

const SideBarCardWrapper = styled.div<{
	bgColor?: string
	hasShadow?: boolean
	hoverBg?: string
	height?: string
	width?: string
	padding?: string
}>`
	width: ${(props) => props.width || '100%'};
	height: ${(props) => props.height || 'min-content'};
	text-align: center;
	padding: ${(props) => props.padding || undefined};
	background-color: ${(props) => props.bgColor || 'transparent'};
	border-radius: 8px;
	margin-bottom: 8px;
	transition: 0.3s;
	cursor: pointer;

	/* If props has a shadow */
	${(props) =>
		props.hasShadow &&
		css`
			box-shadow: var(--box-shadow);
		`}

	&:hover {
		background-color: ${(props) => props.hoverBg || undefined};
	}
`
