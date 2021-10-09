import { UserProfileType } from '../../types/profile.type'
import styled from 'styled-components'
import FeedPost from '../feed/FeedPost'
import FeedPostUnauthenticated from '../feed/FeedPostUnauthenticated'
import Button from '../button/Button'
import Router from 'next/router'
import { Post } from '../../generated/graphql'

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'

interface Props {
	profile: UserProfileType
	postData: Post
}

export default function PostDetailBody(props: Props) {
	return (
		<PostDetailBodyWrapper>
			{(() => {
				/**
				 * If the user is authenticated, and the data is
				 * valid, then render FeedPost component providing
				 * Post details data from props.
				 */
				if (props.profile && props.postData) {
					return (
						<FeedPost
							profile={props.profile}
							postId={props.postData.id as string}
							caption={props.postData.caption as string}
							type={props.postData.type as string}
							authorId={props.postData.author.id as string}
							fullname={props.postData.author.fullname as string}
							username={props.postData.author.username as string}
							timestamp={props.postData.created_at}
							imageSrc={props.postData.attachments?.uri}
							avatarSrc={
								props.postData.author.avatar_url as
									| string
									| undefined
							}
							commentSum={0}
							onRefecthCallback={() => {}}
							badge={
								props.postData.author.badges
									? props.postData?.author.badges[0]
									: undefined
							}
						/>
					)
				}

				/**
				 * If the data is not valid.
				 * That means there is an error in the front,
				 * so render 404 not found error message.
				 */
				if (!props.postData) {
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
									Whoops! we can't find your desired post.
								</NotFoundBodyText>
								<NotFoundBodySub>
									You might misspell the URL or the post
									you're looking for is not available.
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
				}

				/**
				 * If the user is not authenticated.
				 * Render FeedPostUnauthenticated, this component
				 * basically the same as FeedPost, but there is no
				 * subscription and mutation to the backend.
				 */
				if (!props.profile) {
					return (
						<FeedPostUnauthenticated
							postId={props.postData.id as string}
							caption={props.postData.caption as string}
							type={props.postData.type as string}
							authorId={props.postData.author.id as string}
							fullname={props.postData.author.fullname as string}
							username={props.postData.author.username as string}
							timestamp={props.postData.created_at}
							imageSrc={props.postData.attachments?.uri}
							avatarSrc={
								props.postData.author.avatar_url as
									| string
									| undefined
							}
							badge={
								props.postData.author.badges
									? props.postData.author.badges[0]
									: undefined
							}
						/>
					)
				}
			})()}
		</PostDetailBodyWrapper>
	)
}

const PostDetailBodyWrapper = styled.div`
	display: flex;
	margin: 28px 20%;

	// how mobile should behave
	@media (max-width: 600px) {
		margin: 0;
	}
`

const PostDetailBodyNotFoundWrapper = styled.div`
	width: 100%;
	margin: 18px;
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
