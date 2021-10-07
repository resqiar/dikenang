import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Card from '../card/Card'
import {
	useFollowMutation,
	useGetUserAttachmentInfoQuery,
	useGetUserFollowersQuery,
	useUnfollowMutation,
} from '../../generated/graphql'
import { UserProfileType } from '../../types/profile.type'

import { Avatar, Button } from '@material-ui/core'
import { VerifiedUser } from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { ProfileDetailProps } from '../../pages/[username]'
import ProfileAttachmentSkeleton from './skeleton/ProfileAttachmentSkeleton'

interface Props {
	user: UserProfileType
	profileDetail: ProfileDetailProps
}

export default function ProfileHeader(props: Props) {
	/**
	 * Query user attachment from graphql resolver
	 * this query will be used below on publics,
	 * folls, and also the rest.
	 */
	const getUserAttachmentInfo = useGetUserAttachmentInfoQuery({
		variables: {
			username: props.profileDetail.username,
		},
	})

	const getUserFollowers = useGetUserFollowersQuery({
		variables: {
			username: props.profileDetail.username,
		},
	})

	/**
	 * State to manage either user has been
	 * followed or not
	 */
	const [isFollowing, setIsFollowing] = useState(false)

	useEffect(() => {
		const checkFollowed = async () => {
			if (!getUserFollowers.data) return null
			getUserFollowers.data?.user.followers?.map((value) => {
				if (value.id === props.user.id) {
					setIsFollowing(true)
				}
			})
		}

		checkFollowed()
	}, [getUserFollowers.data])

	/**
	 * Graphql mutations to
	 * either follow or unfollow
	 */
	const [followMutation] = useFollowMutation()
	const [unfollowMutation] = useUnfollowMutation()

	const handleFoll = () => {
		if (isFollowing) {
			unfollowMutation({
				variables: {
					username: props.profileDetail.username,
				},
			})
			setIsFollowing(false)
		} else {
			followMutation({
				variables: {
					username: props.profileDetail.username,
				},
			})
			setIsFollowing(true)
		}
	}

	return (
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
						{/* Overlay Fade Effect */}
						<FadeEffect />
					</BannerWrapper>

					{/* Profile Text */}
					<ProfileTextWrapper>
						<ProfileAvatar>
							{/* Avatar */}
							<AvatarElement
								src={props.profileDetail.avatar_url}
								alt="avatar"
							/>

							{/* Follow Button */}
							{props.user.id !== props.profileDetail.id ? (
								<FollowButtonWrapper>
									{!isFollowing ? (
										<FollowButton
											variant="contained"
											fullWidth={true}
											onClick={() => handleFoll()}
										>
											Follow
										</FollowButton>
									) : (
										<UnfollowButton
											variant="outlined"
											fullWidth={true}
											onClick={() => handleFoll()}
										>
											Unfollow
										</UnfollowButton>
									)}
								</FollowButtonWrapper>
							) : undefined}
						</ProfileAvatar>

						<HeaderDetailText>
							<UsernameWrapper>
								{/* Username Text */}
								<UsernameElement>
									{props.profileDetail.fullname}
									{/* Verified Badge */}
									{props.profileDetail.verified ? (
										<BadgeWrapper>
											<VerifiedUser
												style={{
													color: 'blue',
													width: '18px',
													margin: '0px 0px -5px 2px',
												}}
											/>
										</BadgeWrapper>
									) : undefined}
								</UsernameElement>
							</UsernameWrapper>

							<UniqueNameElement>
								@{props.profileDetail.username}
							</UniqueNameElement>
							<BioElement>{props.profileDetail.bio}</BioElement>

							{/* Followers And Stuff */}
							{getUserAttachmentInfo.loading ? (
								<ProfileAttachmentSkeleton />
							) : (
								<AttributesWrapper>
									{/* Publics */}
									<PublicFeedTextElement>
										{
											getUserAttachmentInfo.data
												?.getUserAttachment.publics
										}
										<PublicFeedSubTextElement>
											Publics
										</PublicFeedSubTextElement>
									</PublicFeedTextElement>

									{/* Followers */}
									<PublicFeedTextElement>
										{
											getUserAttachmentInfo.data
												?.getUserAttachment.folls
										}
										<PublicFeedSubTextElement>
											Folls
										</PublicFeedSubTextElement>
									</PublicFeedTextElement>

									{/* Upvotes */}
									<PublicFeedTextElement>
										{
											getUserAttachmentInfo.data
												?.getUserAttachment.upvotes
										}
										<PublicFeedSubTextElement>
											Upvotes
										</PublicFeedSubTextElement>
									</PublicFeedTextElement>

									{/* Relationship */}
									<RelationshipStatusWrapper>
										<FontAwesomeIcon
											color="var(--font-white-800)"
											icon={
												getUserAttachmentInfo.data
													?.getUserAttachment
													.relationship
													? faDoorClosed
													: faDoorOpen
											}
										/>
										<RelationshipStatusText>
											{getUserAttachmentInfo.data
												?.getUserAttachment.relationship
												? 'In relationship'
												: 'Not in Relationship'}
										</RelationshipStatusText>
									</RelationshipStatusWrapper>
								</AttributesWrapper>
							)}
						</HeaderDetailText>
					</ProfileTextWrapper>
				</ProfileHeaderWrapper>
			</Card>
		</ProfileSection>
	)
}

const BannerElement = styled(Image)`
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
`

const AvatarElement = styled(Avatar)`
	width: 125px;
	height: 125px;
	border: 2px solid var(--font-white-800);
	margin-top: -50%;

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
	margin-left: 5%;
	padding-top: 8px;

	// how mobile should behave
	@media (max-width: 600px) {
		margin-left: 0px;
		margin-bottom: 4px;
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
	width: 100%;
	flex-direction: column;
	align-items: flex-start;
	text-align: start;
	padding: 18px 18px 0px 18px;
	gap: 2px;

	// how mobile should behave
	@media (max-width: 600px) {
		align-items: center;
		text-align: center;
	}
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
const AttributesWrapper = styled.div`
	padding: 22px 0px;
	width: 100%;
	flex-flow: row wrap;
	display: flex;
	gap: 5%;
	align-items: center;
	justify-content: flex-start;

	// how mobile should behave
	@media (max-width: 600px) {
		padding: 18px 0px;
		justify-content: space-evenly;
		gap: 0;
	}
`
const PublicFeedTextElement = styled.span`
	font-weight: bold;
	display: flex;
	gap: 4px;
	font-size: 15px;
	color: var(--font-white-800);
`
const PublicFeedSubTextElement = styled.p`
	font-weight: normal;
	font-size: 15px;
	margin-bottom: 6px;
`
const RelationshipStatusWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	margin-bottom: 6px;
`
const RelationshipStatusText = styled.p`
	color: var(--font-white-800);
	font-size: 15px;
`
const FollowButtonWrapper = styled.div`
	margin: 20px 4px 8px 4px;

	// how mobile should behave
	@media (max-width: 600px) {
		margin: 12px 4px 2px 4px;
	}
`
const BadgeWrapper = styled.span`
	padding: 0px 4px;
`
const FollowButton = styled(Button)`
	background: var(--color-primary);
	border-radius: 20px;
	padding: 2px 0px;
	color: white;
	font-family: var(--font-family);
	font-weight: bold;
	text-transform: none;
	font-size: 16px;

	&:hover {
		background: purple;
	}
`
const UnfollowButton = styled(Button)`
	border-radius: 20px;
	padding: 2px 0px;
	color: white;
	font-family: var(--font-family);
	font-weight: bold;
	text-transform: none;
	font-size: 16px;
`
