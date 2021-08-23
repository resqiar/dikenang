import React from 'react'
import styled from 'styled-components'
import Icons from '../icons/Icons'
import ConfirmationModal from '../modal/ConfirmationModal'
import { UserProfileType } from '../../types/profile.type'
import { useDeletePostMutation } from '../../generated/graphql'
import Router from 'next/router'

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
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import LinkIcon from '@material-ui/icons/Link'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

interface Props {
	onRefecthCallback: () => void
	profile: UserProfileType
	postAuthorId: string
	postAuthorUsername: string
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

	/**
	 * Copy to clipboard functionality.
	 * when user click the item, it should
	 * write post URL to the clipboard.
	 */
	const [copied, setCopied] = React.useState(false)

	const handleCopyClick = () => {
		// write/save the url to clipboard
		navigator.clipboard.writeText(
			`${
				process.env.NEXT_PUBLIC_FRONTEND_HOST
			}/${props.postAuthorUsername.replaceAll(' ', '%20')}/${
				props.postId
			}`
		)

		// close menu and trigger Snackbar
		setCopied(true)
		handleClose()
	}

	const handleCopyClose = (
		_event: React.SyntheticEvent | React.MouseEvent,
		reason?: string
	) => {
		if (reason === 'clickaway') return
		setCopied(false)
	}

	return (
		<FeedMoreItemWrapper>
			<Icons
				Icon={MoreHorizIcon}
				hasIconButton={true}
				onClickCallback={handleClick}
				color="var(--font-white-600)"
				label="More"
			/>

			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{/* Details of the Post */}
				<StyledMenuItem
					onClick={() =>
						Router.push(
							`/${props.postAuthorUsername}/${props.postId}`
						)
					}
				>
					<ListItemIcon>
						<OpenInNewIcon />
					</ListItemIcon>
					<ListItemText
						primary="Fullscreen"
						secondary="Open and read post in fullscreen mode"
					/>
				</StyledMenuItem>

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

				{/* Copy URL of the Post */}
				<StyledMenuItem onClick={handleCopyClick}>
					<ListItemIcon>
						<LinkIcon />
					</ListItemIcon>
					<ListItemText
						primary="Copy post URL"
						secondary="save current post url to clipboard"
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
			<ConfirmationModal
				headerText="Delete this post?"
				bodyText="You will not be able to recover this post after delete,
				are you sure?"
				onOpenCallback={openDeleteModal}
				onCloseCallback={() => setOpenDeleteModal(false)}
				onSubmitCallback={handlePostDelete}
				isLoading={deletePostData.loading ? true : false}
			/>

			{/* SNACKBAR COMPONENT */}
			{/* WHEN USER COPY URL TO CLIPBOARD */}
			{/* THIS SNACKBAR WILL BE SHOWN AFTERWARDS */}
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				open={copied}
				autoHideDuration={5000}
				onClose={handleCopyClose}
				message="Copied to clipboard"
				action={
					<>
						<IconButton
							size="small"
							aria-label="close"
							color="inherit"
							onClick={handleCopyClose}
						>
							<CloseIcon fontSize="small" />
						</IconButton>
					</>
				}
			/>
		</FeedMoreItemWrapper>
	)
}

const FeedMoreItemWrapper = styled.div``
