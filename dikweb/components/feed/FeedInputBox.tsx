import { Avatar, IconButton } from '@material-ui/core'
import styled from 'styled-components'
import Button from '../button/Button'
import FeedInputButton from './FeedInputButton'
import { useState } from 'react'
import ModalDialog from '../modal/ModalDialog'
import FeedInputDialog from './FeedInputDialog'
import { UserProfileType } from '../../types/profile.type'

import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import MicIcon from '@material-ui/icons/Mic'

interface Props {
	profile: UserProfileType
	onUploadCallback: () => void
}

export default function FeedInputBox({ profile, onUploadCallback }: Props) {
	/** Modal State */
	const [openModal, setOpenModal] = useState<boolean>(false)

	return (
		<FeedInputWrapper>
			<FeedInputBoxWrapper>
				{/* Avatar */}
				<FeedInputBoxAvatarWrapper>
					<IconButton>
						<Avatar src={profile.avatar_url} />
					</IconButton>
				</FeedInputBoxAvatarWrapper>

				{/* Box Button */}
				<Button
					type="button"
					text="What interest you to share this day?"
					border="none"
					textAlign="start"
					fontWeight="600"
					color="var(--font-white-600)"
					padding="14px 18px"
					borderRadius="100px"
					hoverColor="var(--font-white)"
					hoverBg="var(--background-dimmed-300)"
					hoverBoxShadow="var(--box-shadow)"
					mobileFontSize="14px"
					/** onClick to open modal dialog */
					onClick={() => {
						setOpenModal(true)
					}}
				/>

				{/* Modal Dialog */}
				<ModalDialog
					onOpenCallback={openModal}
					onCloseCallback={() => setOpenModal(false)}
				>
					{/* Feed Input Modal Component */}
					<FeedInputDialog
						profile={profile}
						// When user close the dialog
						onCloseCallback={() => setOpenModal(false)}
						// When user successfully upload post, refecth parent feeds
						onUploadCallback={() => onUploadCallback()}
					/>
				</ModalDialog>
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
