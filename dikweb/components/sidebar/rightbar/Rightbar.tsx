import styled from 'styled-components'
import { useGetMyRelationshipQuery } from '../../../generated/graphql'
import Card from '../../card/Card'
import SidebarHeader from '../header/SidebarHeader'
import SidebarHeaderProfile from '../header/SidebarHeaderProfile'
import SidebarSkeleton from '../SidebarSkeleton'
import PartnerNotFound from './PartnerNotFound'

export default function Rightbar() {
	/**
	 * Check to the server whether
	 * current user has a relationship or not,
	 * if not return null.
	 */
	const getMyRelationship = useGetMyRelationshipQuery()

	return (
		<RightBarWrapper>
			{getMyRelationship.loading ? (
				<SidebarSkeleton />
			) : (
				[
					getMyRelationship.data ? (
						<Card bgColor="var(--background-dimmed-500)">
							<SidebarHeader bannerSrc="/images/bg.png" />
							<SidebarHeaderProfile
								username="Your Future Partner"
								description="Stay tune for future partner feature!"
							/>
						</Card>
					) : (
						<PartnerNotFound />
					),
				]
			)}
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
