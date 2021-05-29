import styled from 'styled-components'
import SidebarCard from '../container/SidebarCard'

export default function Rightbar() {
	return (
		<RightBarWrapper>
			{/* Card */}
			<SidebarCard />
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
	top: 20px;

	/* How mobile should behave */
	@media (max-width: 600px) {
		flex: 0;
		display: none;
	}
`
