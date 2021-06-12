import styled from 'styled-components'

interface Props {
	children: JSX.Element | JSX.Element[] | string
	color?: string
	fontSize?: string
	padding?: string
	margin?: string
}

export default function Heading(props: Props) {
	return (
		<HeadingElement
			color={props.color}
			fontSize={props.fontSize}
			padding={props.padding}
			margin={props.margin}
		>
			{props.children}
		</HeadingElement>
	)
}

const HeadingElement = styled.h1<{
	color?: string
	padding?: string
	fontSize?: string
	margin?: string
}>`
	color: ${(props) => props.color || undefined};
	font-size: ${(props) => props.fontSize || 'inherit'};
	padding: ${(props) => props.padding || undefined};
	margin: ${(props) => props.margin || undefined};
`
