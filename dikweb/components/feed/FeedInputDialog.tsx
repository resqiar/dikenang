import { useEffect, useRef, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import styled from 'styled-components'
import FeedInputButton from './FeedInputButton'
import Button from '../button/Button'
import { UserProfileType } from '../../types/profile.type'
import FeedTypeAttribute from './FeedTypeAttribute'

import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import MicIcon from '@material-ui/icons/Mic'
import CloseIcon from '@material-ui/icons/Close'
import DeleteSweepTwoToneIcon from '@material-ui/icons/DeleteSweepTwoTone'
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded'
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded'

interface Props {
	profile: UserProfileType
	onCloseCallback: () => void
}

export default function FeedInputDialog(props: Props) {
	/**
	 * @Caption
	 * Handle and store user caption input
	 * e.g determine if caption contains only whitespace
	 */
	const [caption, setCaption] = useState<string | null>(null)

	/**
	 * @PostType
	 * Handle and store post type
	 * "public" or "private"
	 */
	const [postType, setPostType] = useState<string>('public')

	/**
	 * @ImageBlob
	 * Handle and store user raw image input
	 * e.g upload raw image to cloudinary
	 */
	const [rawImage, setRawImage] = useState<Blob | null>(null)

	/**
	 * @ImagePreview
	 * Handle and store user image input
	 * e.g show the preview of image that is just uploaded
	 */
	const [imagePreview, setImagePreview] = useState<
		string | ArrayBuffer | null
	>(null)

	/**
	 * @PreviewMinimized @MobileOnly
	 * Handle minimize attachments preview
	 * to save more space to write caption on mobile
	 */
	const [previewMinimized, setPreviewMinimized] = useState<boolean>(false)

	/**
	 * @ImageRef
	 * Handle reference to <input> type image
	 * i.e this hook is used to perform event to the element
	 * e.g click, double click, etc
	 */
	const inputImageRef = useRef<HTMLInputElement | null>(null)

	/**
	 * @function handlePostSubmit()
	 * Handle everything to upload post to database.
	 * First thing first, upload all media to cloudinary,
	 * Submit back to backend as a string URL
	 */
	const handlePostSubmit = () => {
		if (!caption || !caption.replace(/\s/g, '').length) return
	}

	/**
	 * This @useEffect hook is used to track uploaded media
	 * And automatically re-render components
	 * When some sort of media uploaded changes
	 */
	useEffect(() => {
		if (rawImage) {
			/**
			 * If user uploaded image
			 * Set the media to @useState hook to be
			 * Used and rendered with image tag
			 */
			const reader = new FileReader()
			reader.onloadend = () => {
				// set image preview URL
				setImagePreview(reader.result)
			}
			reader.readAsDataURL(rawImage)
		} else {
			setImagePreview(null)
		}
	}, [rawImage])

	return (
		<FeedInputDialogWrapper>
			<FeedInputDialogHeader>
				<FeedInputProfileWrapper>
					{/* Avatar */}
					<IconButton>
						<Avatar src={props.profile.avatar_url} />
					</IconButton>

					<FeedInputProfileAttributeWrapper>
						{/* Username */}
						<FeedInputDialogUsername>
							{props.profile.username}
						</FeedInputDialogUsername>

						{/* Feed Type Attribute */}
						<FeedTypeAttribute
							disablePrivate={
								!props.profile.relationship ? true : false
							}
							postTypeValue={postType}
							onChangeCallbacks={(
								event: React.ChangeEvent<{
									value: unknown
								}>
							) => {
								setPostType(event.target.value as string)
							}}
						/>
					</FeedInputProfileAttributeWrapper>
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
					onChange={(event) => setCaption(event.target.value)}
					placeholder="What interest you to share this day?"
				/>

				{/* If there is previewed media uploaded */}
				{imagePreview ? (
					<FeedinputDialogPreview>
						{/* Preview Header */}
						<FeedInputDialogPreviewHeader>
							{/* Header Text */}
							<FeedInputDialogPreviewText>
								Attachment Preview
							</FeedInputDialogPreviewText>

							{/* Header Button */}
							<FeedInputDialogPreviewButton>
								{/* Minimize Button */}
								<FeedInputDialogPreviewMinimize>
									{!previewMinimized ? (
										<IconButton
											onClick={() =>
												setPreviewMinimized(true)
											}
										>
											<KeyboardArrowDownRoundedIcon
												style={{
													color: 'var(--font-white-800)',
												}}
											/>
										</IconButton>
									) : (
										<IconButton
											onClick={() =>
												setPreviewMinimized(false)
											}
										>
											<KeyboardArrowUpRoundedIcon
												style={{
													color: 'var(--font-white-800)',
												}}
											/>
										</IconButton>
									)}
								</FeedInputDialogPreviewMinimize>

								{/* Cancel Upload Attachments */}
								<IconButton
									onClick={() => {
										setRawImage(null)
										setPreviewMinimized(false)
									}}
								>
									<DeleteSweepTwoToneIcon
										style={{
											color: 'var(--font-white-800)',
										}}
									/>
								</IconButton>
							</FeedInputDialogPreviewButton>
						</FeedInputDialogPreviewHeader>

						{/* Image Preview */}
						<FeedInputDialogPreviewImage
							src={imagePreview as string}
							minimized={previewMinimized}
						/>
					</FeedinputDialogPreview>
				) : undefined}
			</FeedInputDialogBody>

			<FeedInputDialogFooter>
				{/* Upload Attachments Button*/}
				<FeedInputDialogAttachments>
					{/* Image */}
					<FeedInputButton
						title="Photo"
						hideTitleOnMobile
						Icon={PhotoSizeSelectActualIcon}
						iconColor="#0091ff"
						onClickCallback={() => inputImageRef.current!.click()}
					/>
					<input
						type="file"
						style={{ display: 'none' }}
						ref={inputImageRef}
						accept="image/*"
						onChange={(event) => {
							// If there is no uploaded file, return
							if (!event.target.files) return

							const file = event.target.files[0]

							// Check if type is image or not
							if (file && file.type.substr(0, 5) === 'image') {
								setRawImage(file)
							} else {
								setRawImage(null)
							}
						}}
					/>

					{/* Video */}
					<FeedInputButton
						Icon={PlayCircleFilledIcon}
						title="Video"
						hideTitleOnMobile
						iconColor="#b46e8b"
					/>

					{/* Audio */}
					<FeedInputButton
						Icon={MicIcon}
						hideTitleOnMobile
						title="Audio"
						iconColor="#4cc04b"
					/>

					{/* Story */}
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
						border="none"
						color="var(--font-white-800)"
						borderRadius="20px"
						fontSize="16px"
						fontWeight="bold"
						padding="8px 24px"
						hoverBg="var(--color-primary)"
						hoverBoxShadow="var(--box-shadow)"
						// disable if there is no input OR input only contains whitespace
						disabled={
							!caption || !caption.replace(/\s/g, '').length
								? true
								: false
						}
						onClick={() => handlePostSubmit()}
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
	align-items: flex-start;
	justify-content: space-between;
	padding: 0px 8px;

	@media (max-width: 600px) {
		align-items: center;
	}
`
const FeedInputProfileWrapper = styled.div`
	display: flex;
	align-items: center;
`

const FeedInputProfileAttributeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 14px 4px 4px 4px;
	gap: 6px;

	@media (max-width: 600px) {
		padding: 8px 4px;
	}
`

const FeedInputDialogUsername = styled.p`
	color: var(--font-white-800);
	font-weight: bold;
	font-size: 16px;
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
		width: 100%;
		max-width: 100%;
	}
`
const FeedInputDialogPreviewHeader = styled.div`
	padding: 0px 8px;
	display: flex;
	margin-bottom: 8px;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 600px) {
		background-color: var(--background-dimmed-300);
	}
`

/** PREVIEW */
const FeedInputDialogPreviewImage = styled.img<{
	minimized?: boolean
}>`
	width: 100%;
	height: 100%;
	display: ${(props) => (props.minimized ? 'none' : 'inherit')};
	max-width: 450px;
	max-height: 350px;
	object-fit: cover;

	@media (max-width: 600px) {
		max-width: 100%;
		min-height: 300px;
		max-height: 300px;
	}
`
const FeedInputDialogPreviewText = styled.h3`
	color: var(--font-white-800);
	padding: 18px 0px;

	@media (max-width: 600px) {
		font-size: 14px;
		padding: 4px;
	}
`
const FeedInputDialogPreviewButton = styled.div`
	display: flex;
	align-items: center;
`
const FeedInputDialogPreviewMinimize = styled.div`
	@media (min-width: 600px) {
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
