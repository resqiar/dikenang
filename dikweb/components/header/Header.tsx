import Icons from '../icons/Icons'
import DikenangLogo from '../logo/DikenangLogo'
import {
	SearchOutlined,
	ChatOutlined,
	FavoriteBorder,
	NotificationsActiveOutlined,
} from '@material-ui/icons'
import Input from '../input/Input'
import { Avatar, IconButton } from '@material-ui/core'
import styled from 'styled-components'
import { UserProfileType } from '../../types/profile.type'

interface Props {
	profile: UserProfileType
}

export default function Header({ profile }: Props) {
	return (
		<HeaderWrapper>
			{/* Left Side */}
			<HeaderBrand>
				{/* Brand Logo */}
				<DikenangLogo />

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
					<Icons Icon={NotificationsActiveOutlined} hasIconButton />
				</HeaderIconsList>

				<HeaderAvatarWrapper>
					{/* Avatar Icon */}
					<IconButton>
						<Avatar src={profile.avatar_url} />
					</IconButton>
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
const HeaderAvatarWrapper = styled.div``
