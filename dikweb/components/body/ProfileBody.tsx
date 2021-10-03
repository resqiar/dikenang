import Router from 'next/router'
import styled from 'styled-components'
import ProfileDetails from '../profile/ProfileDetails'
import ProfileHeader from '../profile/ProfileHeader'
import Button from '../button/Button'

import { Breadcrumbs, Link } from '@material-ui/core'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
import ProposeRelationship from '../profile/ProposeRelationship'
import ProfileStats from '../profile/ProfileStats'
import { ProfileDetailProps } from '../../pages/[username]'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'

interface Props {
	profileDetail: ProfileDetailProps
}

export default function ProfileBody(props: Props) {
	if (!props.profileDetail) {
		return (
			<PostDetailBodyNotFoundWrapper>
				<SentimentVeryDissatisfiedIcon
					style={{
						fontSize: '300px',
						color: 'var(--font-white-200)',
					}}
				/>

				<NotFoundBodyWrapper>
					<NotFoundBodyText>
						Whoops! we can't find your desired page.
					</NotFoundBodyText>
					<NotFoundBodySub>
						You might misspell the URL or the user you're looking
						for is not available.
					</NotFoundBodySub>
					<Button
						text="go back"
						bgColor="var(--color-primary)"
						border="none"
						borderRadius="20px"
						type="button"
						isUppercase={true}
						width="200px"
						fontWeight="bold"
						padding="8px"
						color="var(--font-white-800)"
						hoverBoxShadow="var(--box-shadow)"
						margin="18px"
						onClick={() => Router.push('/')}
					/>
				</NotFoundBodyWrapper>
			</PostDetailBodyNotFoundWrapper>
		)
	} else {
		return (
			<ProfileBodyWrapper>
				{/* BreadCrumbs */}
				<BreadcrumbsWrapper>
					<Breadcrumbs aria-label="dashboard" color="inherit">
						<PreviousBreadcrumbElement
							onClick={() => Router.push('/')}
						>
							<HomeRoundedIcon
								style={{ width: 20, height: 20, marginTop: -2 }}
							/>
							Dashboard
						</PreviousBreadcrumbElement>
						<CurrentBreadcrumbElement>
							<AccountCircleRoundedIcon
								style={{ width: 20, height: 20, marginTop: -2 }}
							/>
							Profile
						</CurrentBreadcrumbElement>
					</Breadcrumbs>
				</BreadcrumbsWrapper>

				<ProfileSectionWrapper>
					<ProfileDetailWrapper>
						{/* Profile Header */}
						<ProfileHeader profileDetail={props.profileDetail} />

						{/* Details Card */}
						<ProfileDetails />
					</ProfileDetailWrapper>

					<ProfileSubWrapper>
						{/* Stats */}
						<ProfileStats profileDetail={props.profileDetail} />

						{/* Propose Relationship */}
						<ProposeRelationship
							profileDetail={props.profileDetail}
						/>
					</ProfileSubWrapper>
				</ProfileSectionWrapper>
			</ProfileBodyWrapper>
		)
	}
}

const ProfileBodyWrapper = styled.div`
	margin: 8px 128px 28px 128px;

	// how mobile should behave
	@media (max-width: 600px) {
		margin: 0px;
	}
`

const ProfileSectionWrapper = styled.div`
	display: flex;
	gap: 8px;

	@media (max-width: 600px) {
		flex-direction: column;
		gap: 0px;
	}
`

const ProfileDetailWrapper = styled.div`
	display: flex;
	flex: 0.8;
	flex-direction: column;

	// how mobile should behave
	@media (max-width: 600px) {
		flex: 1;
	}
`
const ProfileSubWrapper = styled.div`
	display: flex;
	flex: 0.25;
	flex-direction: column;
`

const BreadcrumbsWrapper = styled.div`
	padding: 18px;
	display: flex;
	align-items: center;
	color: var(--font-white-400);
`

const PreviousBreadcrumbElement = styled(Link)`
	cursor: pointer;
	color: var(--font-white-500);
	font-size: 12px;
	font-family: var(--font-family);
	display: flex;
	align-items: center;
	gap: 4px;
`

const CurrentBreadcrumbElement = styled(Link)`
	cursor: default;
	color: var(--font-white-700);
	font-size: 12px;
	font-family: var(--font-family);
	display: flex;
	align-items: center;
	gap: 4px;

	&:hover {
		text-decoration: none;
	}
`

const PostDetailBodyNotFoundWrapper = styled.div`
	width: 100%;
	margin: 36px 0px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	// how mobile should behave
	@media (max-width: 600px) {
		margin: 8px;
	}
`

const NotFoundBodyWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const NotFoundBodyText = styled.h1`
	color: var(--font-white-800);
	padding: 8px 0px;

	// how mobile should behave
	@media (max-width: 600px) {
		font-size: 26px;
		text-align: center;
	}
`
const NotFoundBodySub = styled.p`
	color: var(--font-white-600);

	// how mobile should behave
	@media (max-width: 600px) {
		font-size: 14px;
		text-align: center;
	}
`
