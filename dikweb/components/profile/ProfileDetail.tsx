import styled from 'styled-components'
import { Avatar, IconButton } from '@material-ui/core'
import Heading from '../text/Heading'
import SubHeading from '../text/SubHeading'
import Paragraph from '../text/Paragraph'

interface Props {
	username: string
	description: string
	origin: string
	bannerSrc?: string
	avatarSrc?: string
}

export default function ProfileDetail(props: Props) {
	return (
		<ProfileDetailWrapper>
			{/* Banner */}
			<ProfileDetailBanner
				src={props.bannerSrc ? props.bannerSrc : '/images/bg.png'}
				alt="profile-banner"
			/>

			{/* Avatar */}
			<ProfileDetailAvatarWrapper>
				<IconButton>
					<Avatar
						src={props.avatarSrc ? props.avatarSrc : undefined}
						alt="profile-avatar"
						style={{
							width: '150px',
							height: '150px',
							boxShadow: 'var(--box-shadow-18)',
						}}
					/>
				</IconButton>
			</ProfileDetailAvatarWrapper>

			{/* Profile Text */}
			<ProfileDetailText>
				{/* Username */}
				<Heading color="var(--font-white-800)" fontSize="24px">
					{props.username}
				</Heading>

				{/* Description */}
				<SubHeading
					color="var(--font-white-700)"
					fontSize="16px"
					fontWeight="400"
				>
					{props.description}
				</SubHeading>

				{/* More Stuff */}
				<Paragraph
					color="var(--font-white-500)"
					fontSize="12px"
					padding="8px 0px"
				>
					{props.origin}
				</Paragraph>
			</ProfileDetailText>
		</ProfileDetailWrapper>
	)
}

const ProfileDetailWrapper = styled.div``
const ProfileDetailBanner = styled.img`
	width: 100%;
	height: 195px;
	object-fit: cover;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;

	// how mobile should behave
	@media (max-width: 600px) {
		border-radius: 0px;
		height: 150px;
	}
`
const ProfileDetailAvatarWrapper = styled.div`
	margin: -100px 8px 0px 24px;
	display: flex;
	justify-content: start;

	// how mobile should behave
	@media (max-width: 600px) {
		justify-content: center;
		margin: -100px 8px 0px 0px;
	}
`
const ProfileDetailText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin: -4px 0px 8px 32px;

	// how mobile should behave
	@media (max-width: 600px) {
		align-items: center;
		margin: -4px 0px 8px 0px;
	}
`
