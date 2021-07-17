import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface Props {
	fontAwesomeIcon: IconProp
	children: JSX.Element | JSX.Element[] | string
	disabled?: boolean
	onClickCallback?: () => void
}

export default function AuthButton(props: Props) {
	return (
		<AuthButtonElement
			onClick={props.onClickCallback}
			disabled={props.disabled}
		>
			<AuthButtonChildrenWrapper>
				<FontAwesomeIcon
					width="25"
					height="25"
					icon={props.fontAwesomeIcon}
				/>
				<AuthButtonTextWrapper>
					Log in with {props.children}
				</AuthButtonTextWrapper>
			</AuthButtonChildrenWrapper>
		</AuthButtonElement>
	)
}

const AuthButtonElement = styled.button<{ disabled?: boolean }>`
	margin: 18px 0px;
	display: flex;
	justify-content: center;
	width: 100%;
	background-color: ${(props) =>
		props.disabled ? 'transparent' : 'var(--background-dimmed-400)'};
	color: ${(props) =>
		props.disabled ? 'var(--font-white-300)' : 'var(--font-white-800)'};
	font-weight: bold;
	outline: none;
	border: none;
	padding: 10px;
	cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
	border-radius: 8px;
	font-size: 14px;

	&:hover {
		box-shadow: ${(props) =>
			!props.disabled ? 'var(--box-shadow)' : undefined};
		background-color: ${(props) =>
			!props.disabled ? 'var(--background-dimmed-200)' : undefined};
	}
`
const AuthButtonChildrenWrapper = styled.div`
	display: flex;
	gap: 18px;
	align-items: center;
	justify-content: start;
`
const AuthButtonTextWrapper = styled.div``
