import {
	Dispatch,
	MouseEvent,
	SetStateAction,
	useEffect,
	useState,
} from 'react'
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

import { SearchOutlined } from '@material-ui/icons'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import {
	Avatar,
	Menu,
	MenuItem,
	IconButton,
	MenuProps,
	ListItemIcon,
	ListItemText,
	Badge,
} from '@material-ui/core'
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded'
import { withStyles } from '@material-ui/core/styles'

interface Props {
	activePath?: string
	profile: UserProfileType
	titleState?: Dispatch<SetStateAction<string | undefined>>
}

const StyledMenu = withStyles({
	paper: {
		background: 'var(--background-dimmed-500)',
		color: 'var(--font-white-600)',
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

const StyledMenuItem = withStyles(() => ({
	root: {
		'&:hover': {
			backgroundColor: 'var(--font-black-200)',
		},
		'& .MuiListItemIcon-root': {
			minWidth: '0px',
			padding: '0px 18px 0px 8px',
			color: 'var(--font-white-700)',
		},
		'& .MuiListItemText-primary': {
			color: 'var(--font-white-700)',
			fontWeight: 'bold',
		},
		'& .MuiListItemText-secondary': {
			color: 'var(--font-white-300)',
		},
		fontFamily: 'var(--font-family)',
	},
}))(MenuItem)

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

export default function Header(props: Props) {
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
			userId: props.profile.id,
		},
	})

	useEffect(() => {
		if (props.titleState) {
			if (getUnreadSubscription.data) {
				if (
					getUnreadSubscription.data.notificationSubscription.unread >
					0
				) {
					props.titleState(
						`(${getUnreadSubscription.data.notificationSubscription.unread})`
					)
				}
			} else {
				if (
					getUnreadNotifications.data?.notifications.unread ||
					0 > 0
				) {
					props.titleState(
						`(${getUnreadNotifications.data?.notifications.unread})`
					)
				}
			}
		}
	}, [getUnreadNotifications.data, getUnreadSubscription.data])

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
					{/* Dashboard Navigation */}
					<Icons
						Icon={HomeIcon}
						color={
							props.activePath === 'dashboard'
								? 'var(--color-primary)'
								: 'var(--font-white-300)'
						}
						hasIconButton
						label="Dashboard"
						onClickCallback={() => Router.push('/')}
					/>
				</HeaderIconsList>

				<HeaderAvatarWrapper>
					{/* Notifications */}
					<IconButton
						onClick={() => Router.push('/notifications')}
						aria-label="Notifications"
					>
						<Badge
							badgeContent={
								getUnreadSubscription.data
									? getUnreadSubscription.data
											?.notificationSubscription.unread
									: getUnreadNotifications.data?.notifications
											.unread
							}
							style={{ marginBottom: '-4px' }}
							color="secondary"
						>
							<NotificationsActiveIcon
								style={{
									color:
										props.activePath === 'notifications'
											? 'var(--color-primary)'
											: 'var(--font-white-300)',
								}}
							/>
						</Badge>
					</IconButton>

					{/* Avatar Icon */}
					<IconButton onClick={handleClick} aria-label="Account">
						<Avatar
							src={props.profile.avatar_url}
							alt={`${props.profile.username}'s avatar profile picture`}
						/>
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
						{/* Switch account */}
						<StyledMenuItem onClick={handleLogOut}>
							<ListItemIcon>
								<AccountBoxRoundedIcon />
							</ListItemIcon>
							<ListItemText primary="Switch account" />
						</StyledMenuItem>
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
