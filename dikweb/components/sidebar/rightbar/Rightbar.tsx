import styled from 'styled-components'
import Card from '../../card/Card'
import SidebarHeader from '../header/SidebarHeader'
import SidebarHeaderProfile from '../header/SidebarHeaderProfile'

export default function Rightbar() {
	return (
		<RightBarWrapper>
			{/* Card */}
			<Card bgColor="var(--background-dimmed-500)">
				<SidebarHeader bannerSrc="/images/bg.png" />
				<SidebarHeaderProfile
					username="Your Future Partner"
					description="Stay tune for future partner feature!"
				/>
			</Card>
		</RightBarWrapper>
	)
}

const RightBarWrapper = styled.div`
	flex: 0.2;
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 18px 8px;
	height: min-content;
	top: 100px;
	position: sticky;

	/* How mobile should behave */
	@media (max-width: 600px) {
		flex: 0;
		display: none;
	}
`
