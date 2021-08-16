import { useEffect } from 'react'
import styled from 'styled-components'
import {
	useGetListOfNotificationsQuery,
	useUpdateUnreadNotificationsMutation,
} from '../../generated/graphql'
import Card from '../card/Card'
import NotificationItem from '../notifications/NotificationItem'

import { Alert, AlertTitle } from '@material-ui/lab'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'

export default function NotificationsBody() {
	/**
	 * @Query
	 * Define a query to the database to get the
	 * value of user's list of notifications
	 */
	const getLisfOfNotifications = useGetListOfNotificationsQuery()

	/**
	 * @Mutation
	 * Define a mutation to the database to update
	 * the value of user's notifications. In this case, since the user
	 * visit /notifications page, set read status to true.
	 */
	const [updateNotificationsToRead] = useUpdateUnreadNotificationsMutation()

	useEffect(() => {
		/**
		 * After component mounted
		 * Execute mutation to the server to update-
		 * notifications read status.
		 * This mutations only return 200.
		 */
		updateNotificationsToRead()
	}, [])

	return (
		<NotificationsPageWrapper>
			{/* Notification Body */}
			<NotificationBodyWrapper>
				{/* Title */}
				<NotificationBodyTitle>
					Latest notifications
				</NotificationBodyTitle>

				{/* Alert for automatically deleted notifications */}
				<AlertWrapper>
					<Alert
						severity="info"
						icon={<ContactSupportIcon />}
						style={{
							background: 'var(--background-dimmed-300)',
							color: 'var(--font-white)',
						}}
					>
						<AlertTitle>
							Read notifications will be deleted after 3 days.
						</AlertTitle>
						Since dikenang still relies on limited resources, we
						want to make sure our service continues by automatically
						deleting stalled data in our database. Unread
						notifications will not be affected, so you won't miss
						incoming notifications.
					</Alert>
				</AlertWrapper>

				{/* IF NOTIFICATIONS IS NOT EMPTY */}
				{/* IF EMPTY, SHOW EMPTY STATUS CARD */}
				{getLisfOfNotifications.data?.notifications.notifications
					.length || 0 > 0 ? (
					<Card
						bgColor="var(--background-dimmed-500)"
						padding="8px 0px"
					>
						{getLisfOfNotifications.data?.notifications.notifications.map(
							(value) => (
								<NotificationItem
									key={value.id}
									type={value.type}
									authorId={value.authorId}
									postId={value.relatedPostId as string}
									timestamp={value.created_at}
									isRead={value.read || false}
								/>
							)
						)}
					</Card>
				) : (
					<Card
						bgColor="var(--background-dimmed-500)"
						padding="8px 0px"
						hasShadow={true}
					>
						<NotificationsNoneIcon
							style={{
								fontSize: '300px',
								color: 'var(--color-primary)',
							}}
						/>

						<NotFoundText>
							Looks like your notifications are empty!
						</NotFoundText>
					</Card>
				)}
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

const NotFoundText = styled.h3`
	color: var(--font-white-600);
	padding: 18px;
`

const AlertWrapper = styled.div`
	padding: 18px 0px;
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
