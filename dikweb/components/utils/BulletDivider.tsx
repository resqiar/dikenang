import styled from 'styled-components'

interface Props {
	color?: string
	margin?: string
}

export default function BulletDivider(props: Props) {
	return (
		<BulletDividerWrapper color={props.color} margin={props.margin}>
			&#8226;
		</BulletDividerWrapper>
	)
}

const BulletDividerWrapper = styled.div<{ color?: string; margin?: string }>`
	color: ${(props) => props.color || undefined};
	margin: ${(props) => props.margin || undefined};
`
