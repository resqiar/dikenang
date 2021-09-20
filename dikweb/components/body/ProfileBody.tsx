import Router from 'next/router'
import styled from 'styled-components'
import Card from '../card/Card'
import ProfileDetails from '../profile/ProfileDetails'
import ProfileHeader from '../profile/ProfileHeader'

import { Breadcrumbs, Link } from '@material-ui/core'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'

export default function ProfileBody() {
	return (
		<ProfileBodyWrapper>
			{/* BreadCrumbs */}
			<BreadcrumbsWrapper>
				<Breadcrumbs aria-label="dashboard" color="inherit">
					<PreviousBreadcrumbElement onClick={() => Router.push('/')}>
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
					<ProfileHeader />

					{/* Details Card */}
					<ProfileDetails />
				</ProfileDetailWrapper>

				<ProfileSubWrapper>
					<Card bgColor="var(--background-dimmed-500)">
						<div style={{ height: '500px' }}></div>
					</Card>
				</ProfileSubWrapper>
			</ProfileSectionWrapper>
		</ProfileBodyWrapper>
	)
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
	flex: 0.2;
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
