import styled from 'styled-components'
import { DummyPostType } from '../../types/dummypost.type'
import { UserProfileType } from '../../types/profile.type'
import FeedInputBox from '../feed/FeedInputBox'
import FeedPost from '../feed/FeedPost'
import Leftbar from '../sidebar/leftbar/Leftbar'
import Rightbar from '../sidebar/rightbar/Rightbar'

interface Props {
	posts: DummyPostType
	profile: UserProfileType
}

export default function IndexBody({ posts, profile }: Props) {
	return (
		<IndexBodyWrapper>
			{/* Sidebar => Left */}
			<Leftbar profile={profile} />

			{/* Post Feed => Middle */}
			<IndexBodyMidWrapper>
				{/* Feed Input Box */}
				<FeedInputBox profile={profile} />

				{/* Feed Posts */}
				{posts?.map((value: any) => (
					<FeedPost
						key={value.id}
						caption={value.caption}
						username={value.author}
						timestamp={value.timestamp}
						imageSrc={value.attachments?.path}
						upSum={value.summary?.upvotes}
						downSum={value.summary?.downvotes}
						commentSum={value.summary?.comments}
					/>
				))}
			</IndexBodyMidWrapper>

			{/* Sidebar => Right */}
			<Rightbar />
		</IndexBodyWrapper>
	)
}

const IndexBodyWrapper = styled.div`
	display: flex;
	margin: 28px 128px;

	// how mobile should behave
	@media (max-width: 600px) {
		margin: 0px;
	}
`

const IndexBodyMidWrapper = styled.div`
	flex: 0.6;
	margin: 18px 8px;

	// how mobile should behave
	@media (max-width: 600px) {
		flex: 1;
		margin: 0;
	}
`
