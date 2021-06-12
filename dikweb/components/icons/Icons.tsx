import { IconButton } from '@material-ui/core'
import styled from 'styled-components'

interface Props {
	Icon: React.ElementType
	color?: string
	size?: number
	onClickCallback?: () => void
	hasIconButton: boolean
}

export default function Icons(props: Props) {
	return (
		<IconWrapper>
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

const IconWrapper = styled.div`
	padding: 2px;
`
