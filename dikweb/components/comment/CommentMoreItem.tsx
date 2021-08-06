import React from 'react'
import styled from 'styled-components'
import Icons from '../icons/Icons'
import ConfirmationModal from '../modal/ConfirmationModal'
import { UserProfileType } from '../../types/profile.type'
import { useDeleteCommentMutation } from '../../generated/graphql'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
	MenuProps,
	withStyles,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import FlagIcon from '@material-ui/icons/Flag'

interface Props {
	profile: UserProfileType
	commentId: string
	authorId: string
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
			paddingRight: '8px',
			marginTop: '-2px',
			color: 'var(--font-white-500)',
		},
		'& .MuiListItemText-primary': {
			fontSize: '14px',
			color: 'var(--font-white-500)',
			fontWeight: 'bold',
		},
		'& .MuiListItemText-secondary': {
			color: 'var(--font-white-300)',
		},
		fontFamily: 'var(--font-family)',
	},
}))(MenuItem)

export default function CommentMoreItem(props: Props) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false)
	const [deleteComment, deleteCommentData] = useDeleteCommentMutation()

	const handleClick = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)

	const handleCommentDelete = async () => {
		// Send mutations to server to delete comment
		await deleteComment({
			variables: {
				commentId: props.commentId,
			},
		})

		// close modal
		setOpenDeleteModal(false)
	}

	return (
		<FeedMoreItemWrapper>
			<Icons
				Icon={ExpandMoreIcon}
				hasIconButton={true}
				onClickCallback={handleClick}
				color="var(--font-white-300)"
			/>

			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<StyledMenuItem>
					<ListItemIcon>
						<FlagIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Report" />
				</StyledMenuItem>

				{/* Delete Comment */}
				{/* DONT SHOW IF THE COMMENT IS NOT SAME AUTHOR AS THE USER */}
				{props.authorId === props.profile.id ? (
					<StyledMenuItem
						onClick={() => {
							setOpenDeleteModal(true)
							handleClose()
						}}
					>
						<ListItemIcon>
							<DeleteIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText primary="Delete" />
					</StyledMenuItem>
				) : undefined}
			</StyledMenu>

			{/* Delete Post Modal */}
			<ConfirmationModal
				headerText="Delete this comment?"
				bodyText="You will not be able to recover after delete,
				are you sure?"
				onOpenCallback={openDeleteModal}
				onCloseCallback={() => setOpenDeleteModal(false)}
				onSubmitCallback={handleCommentDelete}
				isLoading={deleteCommentData.loading ? true : false}
			/>
		</FeedMoreItemWrapper>
	)
}

const FeedMoreItemWrapper = styled.div``
