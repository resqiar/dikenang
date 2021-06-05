import styled from 'styled-components'
import SidebarCard from '../container/SidebarCard'
import SidebarHeader from '../header/SidebarHeader'
import SidebarHeaderProfile from '../header/SidebarHeaderProfile'

export default function Leftbar() {
	return (
		<LeftBarWrapper>
			{/* Card */}
			<SidebarCard bgColor="var(--background-dimmed-500)">
				<SidebarHeader />
				<SidebarHeaderProfile
					username="dikenang.dev"
					description="Hello and welcome to dikenang!"
				/>
			</SidebarCard>
		</LeftBarWrapper>
	)
}

const LeftBarWrapper = styled.div`
	flex: 0.2;
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 18px 8px;
	height: min-content;
	top: 20px;
	position: sticky;

	/* How mobile should behave */
	@media (max-width: 600px) {
		flex: 0;
		display: none;
	}
`
