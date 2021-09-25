import styled from 'styled-components'
import ModalDialog from '../modal/ModalDialog'

import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Avatar, Button, TextareaAutosize } from '@material-ui/core'

interface Props {
	onOpen: boolean
	onCloseCallback: () => void
	onSubmitCallback: () => void
}

export default function ProposeDialog(props: Props) {
	return (
		<ModalDialog
			onOpenCallback={props.onOpen}
			onCloseCallback={props.onCloseCallback}
			aria-labelledby="propose-dialog"
		>
			<DialogContentWrapper>
				<DialogTitle>
					<DialogTitleElement>
						Propose Relationship
					</DialogTitleElement>
				</DialogTitle>
				<DialogContent style={{ marginTop: '-8px' }}>
					{/* To */}
					<AttachContentWrapper>
						<SubElementText>Target:</SubElementText>
						<ProfileWrapper>
							<Avatar />
							<ProfileTextWrapper>
								<ProfileText>Dikenang Team</ProfileText>
								<ProfileSubText>@dikenang.dev</ProfileSubText>
							</ProfileTextWrapper>
						</ProfileWrapper>
					</AttachContentWrapper>

					{/* Letter */}
					<AttachContentWrapper>
						<SubElementText>Letter (Optional):</SubElementText>
						<LetterElement
							minRows={5}
							maxRows={20}
							placeholder="Write your letter here"
						/>
					</AttachContentWrapper>
					<DialogContentSubText>
						You will be notified after the target read your letter
						or receive the connection.
					</DialogContentSubText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={props.onCloseCallback}
						style={{ color: 'grey' }}
					>
						Cancel
					</Button>
					<Button onClick={props.onSubmitCallback} color="primary">
						Connect
					</Button>
				</DialogActions>
			</DialogContentWrapper>
		</ModalDialog>
	)
}

const DialogContentWrapper = styled.div`
	width: fit-content;
	background: var(--background-dimmed-500);
	display: flex;
	flex-direction: column;

	@media (max-width: 600px) {
		height: 100%;
	}
`
const DialogTitleElement = styled.p`
	color: var(--font-white-800);
	font-weight: bold;
	font-size: 16px;
`
const DialogContentSubText = styled.p`
	color: var(--font-white-600);
	font-size: 14px;
`

const AttachContentWrapper = styled.div`
	gap: 18px;
	margin: 8px 0px;
`

const SubElementText = styled.p`
	color: var(--font-white-600);
	font-weight: bold;
	font-size: 14px;
`

const ProfileWrapper = styled.div`
	padding: 8px;
	display: flex;
	align-items: center;
	gap: 8px;
`

const ProfileTextWrapper = styled.div``
const ProfileText = styled.p`
	color: var(--font-white-800);
	font-weight: bold;
`
const ProfileSubText = styled.p`
	color: var(--font-white-600);
	font-size: 14px;
`
const LetterElement = styled(TextareaAutosize)`
	margin: 4px 0px;
	background: transparent;
	outline: none;
	border: none;
	padding: 18px 0px;
	color: var(--font-white-800);
	font-family: var(--font-family);
	font-size: 14px;
	resize: none;
	width: 100%;
`
