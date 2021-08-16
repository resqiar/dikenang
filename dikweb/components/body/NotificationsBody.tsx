import styled from 'styled-components'
import { UserProfileType } from '../../types/profile.type'
import Card from '../card/Card'
import NotificationItem from '../notifications/NotificationItem'

interface Props {
	profile: UserProfileType
}

export default function NotificationsBody(props: Props) {
	return (
		<NotificationsPageWrapper>
			{/* Notification Body */}
			<NotificationBodyWrapper>
				{/* Title */}
				<NotificationBodyTitle>
					Latest notifications
				</NotificationBodyTitle>

				{/* Notifications */}
				<Card bgColor="var(--background-dimmed-500)" padding="8px 0px">
					<NotificationItem />
					<NotificationItem />
					<NotificationItem />
					<NotificationItem />
					<NotificationItem />
					<NotificationItem />
					<NotificationItem />
					<NotificationItem />
				</Card>
			</NotificationBodyWrapper>

			{/* Right bar */}
			{/* MIGHT BE ADS IN THE FUTURE */}
			{/* <RightBarWrapper>
				<Card
					height="400px"
					bgColor="var(--background-dimmed-500)"
					hasShadow={true}
				/>
				<Card
					height="250px"
					bgColor="var(--background-dimmed-500)"
					hasShadow={true}
				/>
			</RightBarWrapper> */}
		</NotificationsPageWrapper>
	)
}

const NotificationsPageWrapper = styled.div`
	display: flex;
	margin: 18px 5%;

	// how mobile should behave
	@media (max-width: 600px) {
		margin: 0px;
	}
`

const NotificationBodyWrapper = styled.div`
	flex: 0.6;
	margin: 18px 8px;

	// how mobile should behave
	@media (max-width: 600px) {
		flex: 1;
		margin: 0;
	}
`

const NotificationBodyTitle = styled.h1`
	color: var(--font-white-700);
	padding: 8px;

	// how mobile should behave
	@media (max-width: 600px) {
		padding: 4px 18px;
	}
`

// const RightBarWrapper = styled.div`
// 	margin: 18px 8px 4px 8px;
// 	flex-direction: column;
// 	display: flex;
// 	flex: 0.2;
// 	gap: 18px;

// 	// how mobile should behave
// 	@media (max-width: 600px) {
// 		display: none;
// 	}
// `
