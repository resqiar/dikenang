import styled from 'styled-components'
import FeedInputBox from '../feed/FeedInputBox'
import FeedPost from '../feed/FeedPost'
import Leftbar from '../sidebar/leftbar/Leftbar'
import Rightbar from '../sidebar/rightbar/Rightbar'

export default function IndexBody() {
	return (
		<IndexBodyWrapper>
			{/* Sidebar => Left */}
			<Leftbar />

			{/* Post Feed => Middle */}
			<IndexBodyMidWrapper>
				{/* Feed Input Box */}
				<FeedInputBox />

				{/* Feed Posts */}
				<FeedPost
					caption="It was easy to spot her. All you needed to do was look at her socks. They were never a matching pair. One would be green while the other would be blue. One would reach her knee while the other barely touched her ankle. Every other part of her was perfect, but never the socks. They were her micro act of rebellion."
					username="dikenang.dev"
					timestamp="2 hours ago"
					imageSrc="/images/bg.png"
					upSum={1200}
					downSum={250}
					commentSum={1500}
				/>
				<FeedPost
					caption="The box sat on the desk next to the computer. It had arrived earlier in the day and business had interrupted her opening it earlier. She didn't who had sent it and briefly wondered who it might have been. As she began to unwrap it, she had no idea that opening it would completely change her life."
					username="dikenang.dev"
					timestamp="2 hours ago"
					imageSrc="/images/bg-3.png"
					upSum={0}
					downSum={1}
					commentSum={15}
				/>
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
