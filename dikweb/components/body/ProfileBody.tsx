import styled from 'styled-components'
import Image from 'next/image'
import Card from '../card/Card'

import { Avatar, Chip } from '@material-ui/core'
import { VerifiedUser } from '@material-ui/icons'

export default function ProfileBody() {
	return (
		<ProfileBodyWrapper>
			<ProfileDetailWrapper>
				{/* Your Profile */}
				<ProfileSection>
					<Card bgColor="var(--background-dimmed-500)">
						<ProfileHeaderWrapper>
							{/* Banner */}
							<BannerWrapper>
								<BannerElement
									src={
										'https://images.unsplash.com/photo-1526374870839-e155464bb9b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=888&q=90'
									}
									layout="responsive"
									height="20px"
									width="100%"
									quality={90}
									objectFit="cover"
								/>
								<FadeEffect />
							</BannerWrapper>

							{/* Profile Text */}
							<ProfileTextWrapper>
								<ProfileAvatar>
									<AvatarElement
										src={
											'https://lh3.googleusercontent.com/ogw/ADea4I6Z5sS8jA45V0sn8pRm7kO_xYcZznhw222y5LxpAQ=s83-c-mo'
										}
										alt="avatar"
									/>
								</ProfileAvatar>

								{/* Profile Text */}
								<HeaderDetailText>
									<UsernameWrapper>
										{/* Username Text */}
										<UsernameElement>
											Dikenang Engineering Team
										</UsernameElement>

										{/* Badge */}
										<Chip
											avatar={
												<VerifiedUser
													style={{
														color: 'white',
														width: '15px',
														marginTop: '-1px',
														paddingLeft: '2px',
													}}
												/>
											}
											label="Official"
											variant="default"
											size="small"
											style={{
												fontWeight: 'bold',
												color: 'white',
												background:
													'var(--color-primary)',
											}}
										/>
									</UsernameWrapper>

									<UniqueNameElement>
										@dikenang.dev
									</UniqueNameElement>
									<BioElement>
										Official account for Dikenang
										development process. All related to
										development process will be updated here
										regularly.
									</BioElement>
								</HeaderDetailText>
							</ProfileTextWrapper>
						</ProfileHeaderWrapper>
					</Card>
				</ProfileSection>

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
	gap: 18px;

	// how mobile should behave
	@media (max-width: 600px) {
		flex: 1;
	}
`
const ProfileSubWrapper = styled.div`
	display: flex;
	flex: 0.2;
`

const BannerElement = styled(Image)`
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
`

const AvatarElement = styled(Avatar)`
	width: 125px;
	height: 125px;
	border: 2px solid var(--font-white-800);

	// how mobile should behave
	@media (max-width: 600px) {
		width: 100px;
		height: 100px;
	}
`

const FadeEffect = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100%;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	background: rgb(21, 25, 32);
	background: linear-gradient(
		0deg,
		rgba(21, 25, 32, 1) 2%,
		rgba(21, 25, 32, 0) 100%
	);
`

const BannerWrapper = styled.div`
	position: relative;
`

const ProfileHeaderWrapper = styled.div``

const ProfileAvatar = styled.div`
	margin: -6% 0px 0px 5%;

	// how mobile should behave
	@media (max-width: 600px) {
		margin: -15% 0px 4px 0px;
	}
`
const ProfileTextWrapper = styled.div`
	display: flex;
	align-items: center;

	// how mobile should behave
	@media (max-width: 600px) {
		flex-direction: column;
	}
`
const HeaderDetailText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	text-align: start;
	padding: 18px;
	gap: 2px;
`

const UsernameWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`

const UsernameElement = styled.p`
	color: var(--font-white-800);
	font-size: 20px;
	font-weight: bold;
`
const UniqueNameElement = styled.p`
	color: var(--font-white-500);
	font-size: 14px;
`
const BioElement = styled.p`
	color: var(--font-white-700);
	font-size: 14px;
	margin-top: 4px;
`
const ProfileSection = styled.div``
