import React from 'react'
import styled from 'styled-components'
import Icons from '../icons/Icons'
import ModalDialog from '../modal/ModalDialog'
import Button from '../button/Button'
import { UserProfileType } from '../../types/profile.type'
import { useDeletePostMutation } from '../../generated/graphql'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {
	MenuProps,
	withStyles,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import FaceIcon from '@material-ui/icons/Face'
import CircularProgress from '@material-ui/core/CircularProgress'

interface Props {
	onRefecthCallback: () => void
	profile: UserProfileType
	postAuthorId: string
	postId: string
}

// Material-UI styles
const StyledMenu = withStyles({
	paper: {
		background: 'var(--background-dimmed-500)',
		boxShadow: 'var(--box-shadow-18)',
		color: 'var(--font-white-600)',
	},
})((props: MenuProps) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'left',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
))

const StyledMenuItem = withStyles(() => ({
	root: {
		'&:hover': {
			backgroundColor: 'var(--font-black-200)',
		},
		'& .MuiListItemIcon-root': {
			minWidth: '0px',
			padding: '0px 18px 0px 8px',
			color: 'var(--font-white-700)',
		},
		'& .MuiListItemText-primary': {
			color: 'var(--font-white-700)',
			fontWeight: 'bold',
		},
		'& .MuiListItemText-secondary': {
			color: 'var(--font-white-300)',
		},
		fontFamily: 'var(--font-family)',
	},
}))(MenuItem)

export default function FeedMoreItem(props: Props) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false)
	const [deletePost, deletePostData] = useDeletePostMutation()

	const handleClick = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)

	const handlePostDelete = async () => {
		// Send mutations to server to delete post
		await deletePost({
			variables: {
				postId: props.postId,
			},
		})

		// refecth all public feeds
		props.onRefecthCallback()

		// close modal
		setOpenDeleteModal(false)
	}

	return (
		<FeedMoreItemWrapper>
			<Icons
				Icon={MoreHorizIcon}
				hasIconButton={true}
				onClickCallback={handleClick}
				color="var(--font-white-600)"
			/>

			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{/* Post Visibility */}
				<StyledMenuItem>
					<ListItemIcon>
						<FaceIcon />
					</ListItemIcon>
					<ListItemText
						primary="Post Visibility"
						secondary="Post is public and can be seen by anyone"
					/>
				</StyledMenuItem>

				{/* Delete Post */}
				{/* DONT SHOW IF THE POST IS NOT SAME AUTHOR AS THE USER */}
				{props.postAuthorId === props.profile.id ? (
					<StyledMenuItem
						onClick={() => {
							setOpenDeleteModal(true)
							handleClose()
						}}
					>
						<ListItemIcon>
							<DeleteForeverRoundedIcon />
						</ListItemIcon>
						<ListItemText
							primary="Delete Post"
							secondary="Post will be deleted and can't be retracted"
						/>
					</StyledMenuItem>
				) : undefined}
			</StyledMenu>

			{/* Delete Post Modal */}
			<ModalDialog
				onOpenCallback={openDeleteModal}
				onCloseCallback={() => setOpenDeleteModal(false)}
			>
				<DeleteDialogWrapper>
					<DeleteDialogHeader>
						<DeleteDialogHeaderText>
							Delete this post?
						</DeleteDialogHeaderText>
					</DeleteDialogHeader>

					<DeleteDialogBody>
						<DeleteDialogBodyText>
							You will not be able to recover this post after
							delete, are you sure?
						</DeleteDialogBodyText>
					</DeleteDialogBody>

					<DeleteDialogFooter>
						<DeleteDialogFooterButtonWrapper>
							{deletePostData.loading ? (
								<CircularProgress
									size={25}
									style={{
										color: 'var(--color-primary)',
									}}
								/>
							) : (
								<>
									{/* CANCEL */}
									<Button
										onClick={() =>
											setOpenDeleteModal(false)
										}
										text="Cancel"
										type="button"
										padding="8px"
										border="none"
										bgColor="var(--color-primary)"
										color="var(--font-white-800)"
										borderRadius="20px"
									/>

									{/* DELETE */}
									<Button
										onClick={handlePostDelete}
										text="Delete"
										type="button"
										padding="8px"
										border="none"
										color="red"
										borderRadius="20px"
									/>
								</>
							)}
						</DeleteDialogFooterButtonWrapper>
					</DeleteDialogFooter>
				</DeleteDialogWrapper>
			</ModalDialog>
		</FeedMoreItemWrapper>
	)
}

const FeedMoreItemWrapper = styled.div``
const DeleteDialogWrapper = styled.div`
	display: flex;
	border-radius: 8px;
	flex-direction: column;
	height: fit-content;
	width: fit-content;
	background-color: var(--background-dimmed-500);
	padding: 8px;
`
const DeleteDialogHeader = styled.div`
	padding: 16px;
	display: flex;
	width: 100%;
	justify-content: center;
`
const DeleteDialogHeaderText = styled.p`
	font-weight: bold;
	color: var(--font-white-800);
	font-size: 18px;
`
const DeleteDialogBody = styled.div`
	padding: 4px 16px 18px 16px;
`
const DeleteDialogBodyText = styled.p`
	color: var(--font-white-600);
`
const DeleteDialogFooter = styled.div`
	padding: 8px;
`
const DeleteDialogFooterButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	gap: 8px;
`
