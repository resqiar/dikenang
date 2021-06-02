import { Avatar, IconButton } from '@material-ui/core'
import styled from 'styled-components'
import Button from '../button/Button'
import FeedInputButton from './FeedInputButton'

import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import MicIcon from '@material-ui/icons/Mic'

export default function FeedInputBox() {
	return (
		<FeedInputWrapper>
			<FeedInputBoxWrapper>
				{/* Avatar */}
				<FeedInputBoxAvatarWrapper>
					<IconButton>
						<Avatar />
					</IconButton>
				</FeedInputBoxAvatarWrapper>

				{/* Box Button */}
				<Button
					type="button"
					// Element props
					text="What interest you to share this day?"
					border="none"
					textAlign="start"
					fontWeight="600"
					color="var(--font-white-600)"
					padding="14px 18px"
					borderRadius="100px"
					// Hover
					hoverColor="var(--font-white)"
					hoverBg="var(--background-dimmed-300)"
					hoverBoxShadow="var(--box-shadow)"
					// Mobile
					mobileFontSize="14px"
				/>
			</FeedInputBoxWrapper>

			{/* Box Attachments */}
			<FeedInputBoxAttachments>
				<FeedInputButton
					title="Photo"
					Icon={PhotoSizeSelectActualIcon}
					iconColor="#0091ff"
				/>
				<FeedInputButton
					Icon={PlayCircleFilledIcon}
					title="Video"
					iconColor="#b46e8b"
				/>

				<FeedInputButton
					Icon={MicIcon}
					title="Audio"
					iconColor="#4cc04b"
				/>

				<FeedInputButton
					Icon={MenuBookIcon}
					title="Story"
					iconColor="#ddd07b"
				/>
			</FeedInputBoxAttachments>
		</FeedInputWrapper>
	)
}

const FeedInputWrapper = styled.div`
	background-color: var(--background-dimmed-500);
	height: fit-content;
	border-radius: 8px;
	box-shadow: var(--box-shadow);
	margin-bottom: 18px;

	/* How mobile should behave */
	@media (max-width: 600px) {
		border-radius: 0px;
		margin-bottom: 0px;
		padding: 4px 18px;
	}
`

const FeedInputBoxWrapper = styled.div`
	align-items: center;
	padding: 2px 18px;
	display: flex;

	/* How mobile should behave */
	@media (max-width: 600px) {
		padding: 0px 8px;
	}
`
const FeedInputBoxAvatarWrapper = styled.div``

const FeedInputBoxAttachments = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;

	/* How mobile should behave */
	@media (max-width: 600px) {
		padding: 0px 12px;
	}
`
