import styled from 'styled-components'

interface Props {
	fullname: string
	username: string
	description: string
}

export default function SidebarHeaderProfile(props: Props) {
	return (
		<HeaderProfileWrapper>
			<HeaderProfileFullname>{props.fullname}</HeaderProfileFullname>
			<HeaderProfileUsername>@{props.username}</HeaderProfileUsername>
			<HeaderProfileDescription>
				{props.description}
			</HeaderProfileDescription>
		</HeaderProfileWrapper>
	)
}

const HeaderProfileWrapper = styled.div`
	height: min-content;
`

const HeaderProfileFullname = styled.p`
	font-weight: bold;
	font-size: 14px;
	max-lines: 1;
	word-break: break-all;
	color: var(--font-white-800);
`

const HeaderProfileUsername = styled.p`
	font-size: 13px;
	max-lines: 1;
	word-break: break-all;
	margin-top: 2px;
	color: var(--font-white-600);
`

const HeaderProfileDescription = styled.p`
	color: var(--font-grey);
	padding: 4px;
	margin-bottom: 8px;
	font-size: 12px;
	max-lines: 2;
	word-break: break-all;
`
