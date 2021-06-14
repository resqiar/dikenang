import styled from 'styled-components'
import Header from '../components/header/Header'
import Meta from '../components/meta/Meta'
import ProfileDetail from '../components/profile/ProfileDetail'
import Card from '../components/card/Card'
import Heading from '../components/text/Heading'
import checkAuth from '../utils/auth'
import { NextPageContext } from 'next'
import { UserProfileType } from '../types/profile.type'

interface Props {
	user: UserProfileType
}

export default function myrelationship({ user }: Props) {
	return (
		<div>
			{/* Title */}
			<Meta title="Relationship — dikenang" />

			{/* Header */}
			<Header profile={user} />

			{/* Body */}
			<BodyWrapper>
				<ProfileDetailCardWrapper>
					{/* Heading */}
					<Heading
						color="var(--font-white-800)"
						fontSize="24px"
						padding="0px 8px"
					>
						Your Profile
					</Heading>

					{/* Your Profile */}
					<Card
						bgColor="var(--background-dimmed-500)"
						hasShadow={true}
					>
						<ProfileDetail
							bannerSrc="/images/bg-3.png"
							username="dikenang.dev"
							description="Official Dikenang Development Account | Software Engineering"
							origin="Indonesia"
						/>
					</Card>

					{/* Heading */}
					<Heading
						color="var(--font-white-800)"
						fontSize="24px"
						padding="0px 8px"
					>
						Your Partner
					</Heading>

					{/* Your Partner Profile */}
					<Card
						bgColor="var(--background-dimmed-500)"
						hasShadow={true}
					>
						<ProfileDetail
							username="dikenang.official"
							description="Official Dikenang Account"
							origin="Indonesia"
						/>
					</Card>
				</ProfileDetailCardWrapper>

				{/* Mockup Card */}
				<RightBarWrapper>
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

					<Card
						height="300px"
						bgColor="var(--background-dimmed-500)"
						hasShadow={true}
					/>
				</RightBarWrapper>
			</BodyWrapper>
		</div>
	)
}

export async function getServerSideProps(ctx: NextPageContext) {
	/**
	 * Check if cookie is exist
	 * if not => redirect to login page
	 */
	const cookie = ctx.req?.headers.cookie

	if (cookie === undefined)
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		}

	/**
	 * Get User data profile from server
	 * if not exist => redirect to login page
	 */
	const data = await checkAuth(ctx)

	if (!data)
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		}

	return { props: { user: data } }
}

const BodyWrapper = styled.div`
	display: flex;
	gap: 18px;
	margin: 28px 128px;

	// how mobile should behave
	@media (max-width: 600px) {
		margin: 0px;
	}
`
const ProfileDetailCardWrapper = styled.div`
	display: flex;
	flex: 0.8;
	flex-direction: column;
	gap: 18px;

	// how mobile should behave
	@media (max-width: 600px) {
		flex: 1;
	}
`
const RightBarWrapper = styled.div`
	margin: 48px 8px 4px 8px;
	flex-direction: column;
	display: flex;
	flex: 0.2;
	gap: 18px;

	// how mobile should behave
	@media (max-width: 600px) {
		display: none;
	}
`
