import styled from 'styled-components'

interface Props {
	username: string
	description: string
}

export default function SidebarHeaderProfile({ username, description }: Props) {
	return (
		<HeaderProfileWrapper>
			<HeaderProfileUsername>{username}</HeaderProfileUsername>
			<HeaderProfileDescription>{description}</HeaderProfileDescription>
		</HeaderProfileWrapper>
	)
}

const HeaderProfileWrapper = styled.div`
	height: min-content;
	padding: 2px;
`

const HeaderProfileUsername = styled.p`
	font-weight: 600;
	font-size: 14px;
	max-lines: 1;
	word-break: break-all;
	color: var(--font-white-800);
`

const HeaderProfileDescription = styled.p`
	color: var(--font-grey);
	padding: 4px;
	margin-bottom: 8px;
	font-size: 12px;
	max-lines: 2;
	word-break: break-all;
`
