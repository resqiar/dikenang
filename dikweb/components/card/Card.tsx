import styled, { css } from 'styled-components'

interface Props {
	children?: JSX.Element | JSX.Element[]
	padding?: string
	bgColor?: string
	hasShadow?: boolean
	hoverBg?: string
	height?: string
	width?: string
	cursor?: string
}

export default function Card(props: Props) {
	return (
		<SideBarCardWrapper
			bgColor={props.bgColor}
			hasShadow={props.hasShadow}
			hoverBg={props.hoverBg}
			height={props.height}
			width={props.width}
			padding={props.padding}
			cursor={props.cursor}
		>
			{props.children}
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
	cursor?: string
}>`
	width: ${(props) => props.width || '100%'};
	height: ${(props) => props.height || 'min-content'};
	text-align: center;
	padding: ${(props) => props.padding || undefined};
	background-color: ${(props) => props.bgColor || 'transparent'};
	border-radius: 8px;
	margin-bottom: 8px;
	transition: 0.3s;
	cursor: ${(props) => props.cursor || undefined};

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
