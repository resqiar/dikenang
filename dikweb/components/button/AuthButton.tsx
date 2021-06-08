import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface Props {
	fontAwesomeIcon: IconProp
	children: JSX.Element | JSX.Element[] | string
}

export default function AuthButton({ children, fontAwesomeIcon }: Props) {
	return (
		<AuthButtonElement>
			<AuthButtonChildrenWrapper>
				<FontAwesomeIcon
					width="25"
					height="25"
					icon={fontAwesomeIcon}
				/>
				<AuthButtonTextWrapper>
					Log in with {children}
				</AuthButtonTextWrapper>
			</AuthButtonChildrenWrapper>
		</AuthButtonElement>
	)
}

const AuthButtonElement = styled.button`
	margin: 18px 0px;
	display: flex;
	justify-content: center;
	width: 100%;
	background-color: var(--background-dimmed-400);
	color: var(--font-white-800);
	font-weight: bold;
	outline: none;
	border: none;
	padding: 10px;
	cursor: pointer;
	border-radius: 8px;
	font-size: 14px;

	&:hover {
		box-shadow: var(--box-shadow);
		background-color: var(--background-dimmed-200);
	}
`
const AuthButtonChildrenWrapper = styled.div`
	display: flex;
	gap: 18px;
	align-items: center;
	justify-content: start;
`
const AuthButtonTextWrapper = styled.div``
