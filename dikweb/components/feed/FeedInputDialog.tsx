import { Avatar, IconButton } from '@material-ui/core'
import styled from 'styled-components'
import FeedInputButton from './FeedInputButton'
import Button from '../button/Button'
import { UserProfileType } from '../../types/profile.type'

import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import MicIcon from '@material-ui/icons/Mic'
import CloseIcon from '@material-ui/icons/Close'

interface Props {
	profile: UserProfileType
	onCloseCallback: () => void
}

export default function FeedInputDialog(props: Props) {
	return (
		<FeedInputDialogWrapper>
			<FeedInputDialogHeader>
				<FeedInputProfileWrapper>
					{/* Avatar */}
					<IconButton>
						<Avatar src={props.profile.avatar_url} />
					</IconButton>

					{/* Username */}
					<FeedInputDialogUsername>
						{props.profile.username}
					</FeedInputDialogUsername>
				</FeedInputProfileWrapper>

				{/* Close Button */}
				<IconButton onClick={props.onCloseCallback}>
					<CloseIcon style={{ color: '#fff' }} />
				</IconButton>
			</FeedInputDialogHeader>

			<FeedInputDialogBody>
				{/* Text Area Input */}
				<TextAreaElement
					autoFocus={true}
					placeholder="What interest you to share this day?"
				/>

				{/* Preview Attachments */}
				<FeedinputDialogPreview>
					<FeedInputDialogPreviewText>
						Attachment Preview
					</FeedInputDialogPreviewText>

					{/* Image Preview */}
					<FeedInputDialogPreviewImage src="/images/bg.png" />
				</FeedinputDialogPreview>
			</FeedInputDialogBody>

			<FeedInputDialogFooter>
				{/* Attachments */}
				<FeedInputDialogAttachments>
					<FeedInputButton
						title="Photo"
						hideTitleOnMobile
						Icon={PhotoSizeSelectActualIcon}
						iconColor="#0091ff"
					/>
					<FeedInputButton
						Icon={PlayCircleFilledIcon}
						title="Video"
						hideTitleOnMobile
						iconColor="#b46e8b"
					/>

					<FeedInputButton
						Icon={MicIcon}
						hideTitleOnMobile
						title="Audio"
						iconColor="#4cc04b"
					/>

					<FeedInputButton
						Icon={MenuBookIcon}
						hideTitleOnMobile
						title="Story"
						iconColor="#ddd07b"
					/>
				</FeedInputDialogAttachments>

				{/* Submit Button */}
				<FeedInputDialogUpload>
					<Button
						text="Post"
						type="button"
						border="1px solid var(--background-dimmed-300)"
						color="var(--font-white-800)"
						borderRadius="20px"
						fontSize="16px"
						fontWeight="bold"
						padding="8px 24px"
						hoverBg="var(--color-primary)"
						hoverBoxShadow="var(--box-shadow)"
					/>
				</FeedInputDialogUpload>
			</FeedInputDialogFooter>
		</FeedInputDialogWrapper>
	)
}

const FeedInputDialogWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 90%;
	width: 90%;
	border-radius: 8px;
	background-color: var(--background-dimmed-500);
	padding: 8px;

	@media (max-width: 600px) {
		height: 100%;
		width: 100%;
	}
`
const FeedInputDialogHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 8px;
`
const FeedInputProfileWrapper = styled.div`
	display: flex;
	align-items: center;
`
const FeedInputDialogUsername = styled.p`
	color: var(--font-white-800);
	font-weight: bold;
	font-size: 14px;
`
const FeedInputDialogBody = styled.div`
	display: flex;
	align-items: flex-start;
	height: 100%;
	padding: 0px 8px;

	@media (max-width: 600px) {
		flex-direction: column;
		align-items: center;
		padding: 0px;
	}
`

const TextAreaElement = styled.textarea`
	width: 100%;
	max-width: 100%;
	min-height: 150px;
	height: 100%;
	background-color: transparent;
	color: var(--font-white-800);
	font-family: var(--font-family);
	outline: none;
	padding: 18px;
	font-size: 16px;
	border: none;
	resize: none;
	overflow: auto;

	::placeholder,
	::-webkit-input-placeholder {
		color: var(--font-white-500);
		font-size: 18px;
		font-family: var(--font-family);
	}

	@media (max-width: 600px) {
		font-size: 14px;
	}
`
const FeedinputDialogPreview = styled.div`
	padding: 8px 18px;
	max-width: 350px;

	@media (max-width: 600px) {
		padding: 0px;
		max-width: 100%;
	}
`

/** PREVIEW */
const FeedInputDialogPreviewImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`

const FeedInputDialogPreviewText = styled.h3`
	color: var(--font-white-800);
	padding: 18px 0px;

	@media (max-width: 600px) {
		display: none;
	}
`
const FeedInputDialogFooter = styled.div`
	justify-content: space-between;
	align-items: center;
	display: flex;
	padding: 0px 24px;

	@media (max-width: 600px) {
		padding: 4px;
	}
`
const FeedInputDialogAttachments = styled.div`
	display: flex;
`
const FeedInputDialogUpload = styled.div``
