import styled from 'styled-components'

interface Props {
	children: JSX.Element | JSX.Element[] | string
	color?: string
	fontSize?: string
	fontWeight?: string
	padding?: string
	margin?: string
}

export default function Paragraph(props: Props) {
	return (
		<ParagraphElement
			color={props.color}
			fontSize={props.fontSize}
			padding={props.padding}
			margin={props.margin}
			fontWeight={props.fontWeight}
		>
			{props.children}
		</ParagraphElement>
	)
}

const ParagraphElement = styled.p<{
	color?: string
	padding?: string
	fontSize?: string
	fontWeight?: string
	margin?: string
}>`
	color: ${(props) => props.color || undefined};
	font-size: ${(props) => props.fontSize || 'inherit'};
	padding: ${(props) => props.padding || undefined};
	margin: ${(props) => props.margin || undefined};
	font-weight: ${(props) => props.fontWeight || undefined};
`
