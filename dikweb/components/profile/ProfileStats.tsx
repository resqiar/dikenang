import styled from 'styled-components'
import { ProfileDetailProps } from '../../pages/[username]'
import Card from '../card/Card'
import { useGetUserStatsQuery } from '../../generated/graphql'
import moment from 'moment'

interface Props {
	profileDetail: ProfileDetailProps
}

export default function ProfileStats(props: Props) {
	const userStats = useGetUserStatsQuery({
		variables: {
			username: props.profileDetail.username,
		},
	})

	return (
		<Card bgColor="var(--background-dimmed-500)">
			<StatsWrapper>
				<HeaderWrapper>
					<HeaderTextElement>Profile Stats</HeaderTextElement>
				</HeaderWrapper>

				<BodyWrapper>
					<StatsItem>
						<StatsItemHead>Created at</StatsItemHead>
						<StatsItemTail>
							{moment(userStats.data?.user.created_at).format(
								'DD MMMM YYYY'
							)}
						</StatsItemTail>
					</StatsItem>

					<StatsItem>
						<StatsItemHead>Badges collected</StatsItemHead>
						<StatsItemTail>
							{userStats.data?.user.badges?.length}
						</StatsItemTail>
					</StatsItem>

					<StatsItem>
						<StatsItemHead>Status</StatsItemHead>
						<StatsItemTail>
							{userStats.data?.user.relationship
								? 'In Relationship'
								: 'Available'}
						</StatsItemTail>
					</StatsItem>
				</BodyWrapper>
			</StatsWrapper>
		</Card>
	)
}

const StatsWrapper = styled.div``
const HeaderWrapper = styled.div`
	margin: 8px;
`
const HeaderTextElement = styled.p`
	color: var(--font-white-700);
	font-weight: bold;
	font-size: 14px;

	@media (max-width: 600px) {
		font-size: 18px;
	}
`
const BodyWrapper = styled.div`
	margin: 8px 0px;
`
const StatsItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 4px 16px;
`
const StatsItemHead = styled.p`
	color: var(--font-white-600);
	font-size: 13px;
`
const StatsItemTail = styled.p`
	color: var(--font-white-700);
	font-weight: bold;
	font-size: 13px;
`
