import styled from 'styled-components'

interface Props {
	children: JSX.Element | JSX.Element[]
}

export default function SidebarCard({ children }: Props) {
	return <SideBarCardWrapper>{children}</SideBarCardWrapper>
}

const SideBarCardWrapper = styled.div`
	width: 100%;
	height: min-content;
	text-align: center;
	background-color: var(--background-dimmed-300);
	border-radius: 8px;
	margin-bottom: 8px;
	box-shadow: var(--box-shadow);
	transition: 0.3s;
	cursor: pointer;
`
