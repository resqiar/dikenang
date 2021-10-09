import Router from 'next/router'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ModalDialog from '../modal/ModalDialog'
import { ProfileDetailProps } from '../../pages/[username]'
import { useDebounce } from 'use-debounce'
import {
	useCheckUsernameLazyQuery,
	useUpdateProfileMutation,
} from '../../generated/graphql'

import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
	Button,
	CircularProgress,
	TextField,
	withStyles,
} from '@material-ui/core'

interface Props {
	onOpen: boolean
	onCloseCallback: () => void
	profileDetail: ProfileDetailProps
}

export default function ProfileEditDialog(props: Props) {
	/**
	 * State to keep track of every
	 * input field, this will store user
	 * input. default to profile values.
	 */
	const [username, setUsername] = useState<string>(
		props.profileDetail.username
	)
	const [usernameDebounce] = useDebounce<string>(username, 1000)
	const [fullname, setFullname] = useState<string>(
		props.profileDetail.fullname
	)
	const [bio, setBio] = useState<string>(props.profileDetail.bio)

	/**
	 * State to keep track of error
	 * for example if username is already taken
	 * this state will hold error message and will
	 * be shown in corresponding input label
	 */
	const [usernameError, setUsernameError] = useState<string | undefined>()
	const [fullnameError, setFullnameError] = useState<string | undefined>()
	const [bioError, setBioError] = useState<string | undefined>()
	const [generalError, setGeneralError] = useState<string | undefined>()

	/**
	 * Query
	 * this query fetch data from database
	 * to check if the username is already taken or not
	 * if taken, will return error, if not return 200
	 */
	const [checkUsername, checkUsernameResult] = useCheckUsernameLazyQuery()

	/**
	 * this useeffect used as a validation
	 * if there is an error in username
	 * username error state will be updated.
	 */
	useEffect(() => {
		setUsernameError(undefined)
		if (username === props.profileDetail.username) return
		if (usernameDebounce.length < 3 || usernameDebounce.length > 25) {
			return setUsernameError(
				'username must be at least 3 - 25 characters'
			)
		}
		checkUsername({
			variables: {
				username: usernameDebounce,
			},
		})
	}, [usernameDebounce])

	/**
	 * this useeffect used as a validation
	 * if there is an error in username
	 * username error state will be updated.
	 */
	useEffect(() => {
		setUsernameError(undefined)
		if (checkUsernameResult.error) {
			return setUsernameError(checkUsernameResult.error.message)
		}
	}, [checkUsernameResult])

	/**
	 * this useeffect used as a validation
	 * if there is an error in fullname
	 * fullname error state will be updated.
	 */
	useEffect(() => {
		setFullnameError(undefined)
		if (fullname.length > 50) {
			setFullnameError('fullname must be no more than 50 characters')
		}
	}, [fullname])

	/**
	 * this useeffect used as a validation
	 * if there is an error in bio,
	 * bio error state will be updated.
	 */
	useEffect(() => {
		setBioError(undefined)
		if (bio.length > 100) {
			setBioError('bio must be no more than 100 characters')
		}
	}, [bio])

	/**
	 * Mutation
	 * this mutation will fire an update to
	 * the resolver. of course this needs several
	 * validations.
	 */
	const [updateProfile] = useUpdateProfileMutation()

	const handleSubmit = async () => {
		/**
		 * if username query is loading
		 * or there is an error in every
		 * error state, then return.
		 */
		if (
			checkUsernameResult.loading ||
			usernameError ||
			fullnameError ||
			bioError
		)
			return

		/**
		 * if all the data remains the same,
		 * means the user is not updating anything
		 * then close the dialog.
		 */
		if (
			usernameDebounce === props.profileDetail.username &&
			fullname === props.profileDetail.fullname &&
			bio === props.profileDetail.bio
		) {
			return props.onCloseCallback()
		}

		try {
			await updateProfile({
				variables: {
					UpdateUserInput: {
						username: usernameDebounce,
						fullname: fullname,
						bio: bio,
					},
				},
			})

			/**
			 * if updating is success and there is no error,
			 * close up the dialog and force the user
			 * to go to updated page with the updated values
			 */
			Router.push(`/${usernameDebounce}`)
			props.onCloseCallback()
		} catch (error: any) {
			setGeneralError(error.message)
		}
	}

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
							error={usernameError ? true : false}
							helperText={usernameError}
							defaultValue={username}
							onChange={(e) => setUsername(e.target.value)}
							fullWidth
						/>

						<TextFieldElement
							id="fullname-input-field"
							label="fullname"
							variant="outlined"
							error={fullnameError ? true : false}
							helperText={fullnameError}
							defaultValue={fullname}
							onChange={(e) => setFullname(e.target.value)}
							fullWidth
						/>

						<TextFieldElement
							id="bio-input-field"
							label="bio"
							variant="outlined"
							error={bioError ? true : false}
							helperText={bioError}
							defaultValue={bio}
							onChange={(e) => setBio(e.target.value)}
							fullWidth
						/>
					</InputFieldWrapper>

					<DialogContentSubText error={generalError ? true : false}>
						{generalError
							? generalError
							: 'It might take a while for the change to be updated worldwide'}
					</DialogContentSubText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={props.onCloseCallback}
						style={{ color: 'grey' }}
					>
						Cancel
					</Button>
					<Button
						onClick={() => handleSubmit()}
						color="primary"
						disabled={
							checkUsernameResult.loading ||
							usernameError ||
							fullnameError ||
							bioError
								? true
								: false
						}
					>
						{checkUsernameResult.loading ? (
							<CircularProgress size={20} />
						) : (
							'Update'
						)}
					</Button>
				</DialogActions>
			</DialogContentWrapper>
		</ModalDialog>
	)
}

const DialogContentWrapper = styled.div`
	min-width: 500px;
	background: var(--background-dimmed-500);
	display: flex;
	flex-direction: column;
	box-shadow: var(--box-shadow);

	@media (max-width: 600px) {
		height: 100%;
		min-width: 100%;
	}
`
const DialogTitleElement = styled.p`
	color: var(--font-white-800);
	font-weight: bold;
	font-size: 16px;
`
const DialogContentSubText = styled.p<{ error?: boolean }>`
	color: ${(props) => (props.error ? 'red' : 'var(--font-white-600)')};
	font-size: 14px;
	font-weight: ${(props) => (props.error ? 'bold' : 'undefined')};
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
