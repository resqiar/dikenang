// import Image from 'next/image'
import { Avatar, IconButton } from '@material-ui/core'
import styled from 'styled-components'

interface Props {
	bannerSrc?: string
	avatarSrc?: string
}

export default function SidebarHeader({ bannerSrc, avatarSrc }: Props) {
	return (
		<SidebarHeaderWrapper>
			{/* Banner */}
			<SidebarHeaderBanner
				src={bannerSrc ? bannerSrc : '/images/bg.png'}
				alt="profile-banner"
			/>

			{/* Avatar */}
			<SidebarHeaderAvatarWrapper>
				<IconButton>
					<Avatar
						src={avatarSrc ? avatarSrc : undefined}
						alt="profile-avatar"
						style={{
							width: '70px',
							height: '70px',
							boxShadow: 'var(--box-shadow-18)',
						}}
					/>
				</IconButton>
			</SidebarHeaderAvatarWrapper>
		</SidebarHeaderWrapper>
	)
}

const SidebarHeaderWrapper = styled.div`
	height: min-content;
	width: 100%;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
`
const SidebarHeaderBanner = styled.img`
	width: 100%;
	height: 80px;
	object-fit: cover;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
`
const SidebarHeaderAvatarWrapper = styled.div`
	margin-top: -55px;
`
