import Router from 'next/router'
import styled from 'styled-components'
import { useGetUserProfileQuery } from '../../../generated/graphql'
import { UserProfileType } from '../../../types/profile.type'
import Card from '../../card/Card'
import SidebarHeader from '../header/SidebarHeader'
import SidebarHeaderProfile from '../header/SidebarHeaderProfile'
import SidebarSkeleton from '../SidebarSkeleton'

interface Props {
	profile: UserProfileType
}

export default function Leftbar(props: Props) {
	const getUserProfile = useGetUserProfileQuery({
		variables: {
			id: props.profile.id,
		},
	})

	return (
		<LeftBarWrapper
			onClick={() =>
				Router.push(`/${getUserProfile.data?.getUserById.username}`)
			}
		>
			{getUserProfile.loading ? (
				<SidebarSkeleton />
			) : (
				<Card bgColor="var(--background-dimmed-500)">
					<SidebarHeader
						avatarSrc={
							getUserProfile.data?.getUserById.avatar_url ??
							undefined
						}
					/>
					<SidebarHeaderProfile
						fullname={
							getUserProfile.data?.getUserById.fullname as string
						}
						username={
							getUserProfile.data?.getUserById.username as string
						}
						description={
							getUserProfile.data?.getUserById.bio as string
						}
					/>
				</Card>
			)}
		</LeftBarWrapper>
	)
}

const LeftBarWrapper = styled.div`
	flex: 0.2;
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 18px 8px;
	height: min-content;
	top: 100px;
	position: sticky;
	cursor: pointer;

	/* How mobile should behave */
	@media (max-width: 600px) {
		flex: 0;
		display: none;
	}
`
