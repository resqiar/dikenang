import styled from 'styled-components'

export default function SidebarCard() {
	return <SideBarCardWrapper></SideBarCardWrapper>
}

const SideBarCardWrapper = styled.div`
	width: 100%;
	height: 200px;
	text-align: center;
	background-color: var(--background-dimmed-300);
	border-radius: 8px;
	margin-bottom: 8px;
	box-shadow: var(--box-shadow);
	transition: 0.3s;
	cursor: pointer;
`
