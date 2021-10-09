import styled from 'styled-components'
import ModalDialog from '../modal/ModalDialog'
import { ProfileDetailProps } from '../../pages/[username]'

import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Button, TextField, withStyles } from '@material-ui/core'

interface Props {
	onOpen: boolean
	onCloseCallback: () => void
	onSubmitCallback: () => void
	profileDetail: ProfileDetailProps
}

export default function ProfileEditDialog(props: Props) {
	return (
		<ModalDialog
			onOpenCallback={props.onOpen}
			onCloseCallback={props.onCloseCallback}
			aria-labelledby="propose-dialog"
		>
			<DialogContentWrapper>
				<DialogTitle>
					<DialogTitleElement>Edit Profile</DialogTitleElement>
				</DialogTitle>
				<DialogContent style={{ marginTop: '-18px' }}>
					<InputFieldWrapper>
						<TextFieldElement
							id="username-input-field"
							label="username"
							variant="outlined"
							defaultValue={props.profileDetail.username}
							fullWidth
						/>

						<TextFieldElement
							id="fullname-input-field"
							label="fullname"
							variant="outlined"
							defaultValue={props.profileDetail.fullname}
							fullWidth
						/>

						<TextFieldElement
							id="bio-input-field"
							label="bio"
							variant="outlined"
							defaultValue={props.profileDetail.bio}
							fullWidth
						/>
					</InputFieldWrapper>

					<DialogContentSubText>
						It might take a while for the change to take effect
						worldwide
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
	box-shadow: var(--box-shadow);

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

const TextFieldElement = withStyles({
	root: {
		'& *': {
			color: 'var(--font-white-800)',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'var(--font-white-200)',
			},
			'&:hover fieldset': {
				borderColor: 'var(--font-white-500)',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'blue',
			},
		},
	},
})(TextField)

const InputFieldWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 18px;
	padding: 18px 0px;
`
