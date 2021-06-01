import styled from 'styled-components'
import FeedInputBox from '../feed/FeedInputBox'
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
