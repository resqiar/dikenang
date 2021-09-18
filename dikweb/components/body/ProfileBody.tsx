import styled from 'styled-components'
import Card from '../card/Card'
import ProfileHeader from '../profile/ProfileHeader'

export default function ProfileBody() {
	return (
		<ProfileBodyWrapper>
			<ProfileDetailWrapper>
				{/* Profile Header */}
				<ProfileHeader />

				<Card bgColor="var(--background-dimmed-500)">
					<div style={{ height: '500px' }}></div>
				</Card>
			</ProfileDetailWrapper>

			<ProfileSubWrapper>
				<Card bgColor="var(--background-dimmed-500)">
					<div style={{ height: '500px' }}></div>
				</Card>
			</ProfileSubWrapper>
		</ProfileBodyWrapper>
	)
}

const ProfileBodyWrapper = styled.div`
	display: flex;
	gap: 18px;
	margin: 28px 128px;

	// how mobile should behave
	@media (max-width: 600px) {
		margin: 0px;
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
	flex: 0.2;
`
