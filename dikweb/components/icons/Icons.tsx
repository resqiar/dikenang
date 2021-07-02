import { IconButton } from '@material-ui/core'
import styled from 'styled-components'

interface Props {
	Icon: React.ElementType
	color?: string
	size?: number
	padding?: string
	onClickCallback?: () => void
	hasIconButton: boolean
}

export default function Icons(props: Props) {
	return (
		<IconWrapper padding={props.padding}>
			{props.hasIconButton ? (
				<IconButton onClick={props.onClickCallback}>
					<props.Icon
						style={{
							color: props.color ? props.color : '#545b5f',
							fontSize: props.size,
						}}
					/>
				</IconButton>
			) : (
				<props.Icon
					style={{
						color: props.color ? props.color : '#545b5f',
						fontSize: props.size,
					}}
				/>
			)}
		</IconWrapper>
	)
}

const IconWrapper = styled.div<{ padding?: string }>`
	padding: ${(props) => props.padding || '2px'};
	margin-bottom: -4px;
`
