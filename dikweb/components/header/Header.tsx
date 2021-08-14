import { MouseEvent, useState } from 'react'
import Router from 'next/router'
import Icons from '../icons/Icons'
import DikenangLogo from '../logo/DikenangLogo'
import Input from '../input/Input'
import styled from 'styled-components'
import { UserProfileType } from '../../types/profile.type'
import axiosConfig from '../../utils/axios'
import {
	useGetUnreadNotificationsQuery,
	useUnreadNotificationsSubscription,
} from '../../generated/graphql'

import {
	SearchOutlined,
	ChatOutlined,
	FavoriteBorder,
} from '@material-ui/icons'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined'
import {
	Avatar,
	Menu,
	MenuItem,
	IconButton,
	MenuProps,
	Typography,
	Badge,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

interface Props {
	profile: UserProfileType
}

const StyledMenu = withStyles({
	paper: {
		background: 'var(--background-dimmed-500)',
		color: 'var(--font-white-800)',
	},
})((props: MenuProps) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
))

async function handleLogOut() {
	try {
		// go to authentication page
		Router.push('/auth')
		// call server to delete cookies
		await axiosConfig.get('/auth/logout')
	} catch (e) {
		return
	}
}

export default function Header({ profile }: Props) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	// Handle Open Menu
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	// Handle Close Menu
	const handleClose = () => {
		setAnchorEl(null)
	}

	/**
	 * @Query
	 * Define query to the database to get the
	 * value of user's unread notifications
	 * why using poll? not real-time
	 * see this issue
	 */
	const getUnreadNotifications = useGetUnreadNotificationsQuery()

	/**
	 * @Subscription
	 * Provide low latency update of how much
	 * users unread notifications are, and update the value
	 * in real-time
	 */
	const getUnreadSubscription = useUnreadNotificationsSubscription({
		variables: {
			userId: profile.id,
		},
	})

	return (
		<HeaderWrapper>
			{/* Left Side */}
			<HeaderBrand>
				{/* Brand Logo */}
				<DikenangLogo onClickCallback={() => Router.push('/')} />

				{/* Search Component */}
				<HeaderSearchInput>
					<Input
						placeholder="Search for memories, partners, and stuff"
						type="text"
						hasIcon={true}
						iconColor="grey"
						focusedIconColor="var(--font-white-800)"
						Icon={SearchOutlined}
						// value will dismissed when onBlur
						isDismissedOnBlur={true}
					/>
				</HeaderSearchInput>
			</HeaderBrand>

			{/* Right Side */}
			<HeaderIconsWrapper>
				<HeaderIconsList>
					{/* Mockup for now, future works will replace the following */}
					<Icons Icon={FavoriteBorder} color="purple" hasIconButton />
					<Icons Icon={ChatOutlined} hasIconButton />
				</HeaderIconsList>

				<HeaderAvatarWrapper>
					{/* Notifications */}
					<IconButton>
						{/* IF UNREAD NOTIFICATIONS IS BIGGER THAN 0 */}
						{getUnreadSubscription.data?.notificationSubscription
							.unread! > 0 ||
						getUnreadNotifications.data?.notifications?.unread ||
						0 > 0 ? (
							<Badge
								badgeContent={
									getUnreadSubscription.data
										? getUnreadSubscription.data
												?.notificationSubscription
												.unread
										: getUnreadNotifications.data
												?.notifications.unread
								}
								color="primary"
							>
								<NotificationsActiveIcon
									style={{ color: 'blue' }}
								/>
							</Badge>
						) : (
							<NotificationsNoneOutlinedIcon
								style={{ color: 'blue' }}
							/>
						)}
					</IconButton>

					{/* Avatar Icon */}
					<IconButton onClick={handleClick}>
						<Avatar src={profile.avatar_url} />
					</IconButton>

					{/* Menu Tab */}
					<StyledMenu
						id="header-avatar-menu"
						elevation={0}
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						{/* Profile */}
						<MenuItem
							onClick={() =>
								// go to relationship page
								Router.push('/myrelationship')
							}
						>
							<Typography variant="inherit">
								My Profile
							</Typography>
						</MenuItem>

						{/* Logout */}
						<MenuItem onClick={handleLogOut}>
							<Typography variant="inherit">
								Switch Account
							</Typography>
						</MenuItem>
					</StyledMenu>
				</HeaderAvatarWrapper>
			</HeaderIconsWrapper>
		</HeaderWrapper>
	)
}

const HeaderWrapper = styled.div`
	background: transparent;
	padding: 2px 10%;
	display: flex;
	min-height: 55px;
	align-items: center;
	justify-content: space-between;

	// how mobile should behave
	@media (max-width: 600px) {
		justify-content: space-between;
		padding: 0px 12px 0px 24px;
	}
`
const HeaderBrand = styled.div`
	display: flex;
	align-items: center;
	flex-grow: 1;
`
const HeaderSearchInput = styled.div`
	width: 100%;
	padding: 0px 18px;

	// how mobile should behave
	@media (max-width: 600px) {
		display: none;
	}
`
const HeaderIconsWrapper = styled.div`
	display: flex;
	align-items: center;
`
const HeaderIconsList = styled.div`
	display: flex;
	align-items: center;

	// how mobile should behave
	@media (max-width: 600px) {
		display: none;
	}
`
const HeaderAvatarWrapper = styled.div`
	display: flex;
	align-items: center;
`
