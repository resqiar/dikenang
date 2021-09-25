import styled from 'styled-components'
import Card from '../card/Card'

export default function ProfileStats() {
	return (
		<Card bgColor="var(--background-dimmed-500)">
			<StatsWrapper>
				<HeaderWrapper>
					<HeaderTextElement>Profile Stats</HeaderTextElement>
				</HeaderWrapper>

				<BodyWrapper>
					<StatsItem>
						<StatsItemHead>Created at</StatsItemHead>
						<StatsItemTail>12 june 1999</StatsItemTail>
					</StatsItem>

					<StatsItem>
						<StatsItemHead>Badges collected</StatsItemHead>
						<StatsItemTail>4</StatsItemTail>
					</StatsItem>

					<StatsItem>
						<StatsItemHead>Status</StatsItemHead>
						<StatsItemTail>In Relationship</StatsItemTail>
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
