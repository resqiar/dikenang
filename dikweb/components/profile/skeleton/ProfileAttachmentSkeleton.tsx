import styled from 'styled-components'

import { Skeleton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
	root: {
		'&.MuiSkeleton-root': {
			backgroundColor: 'var(--background-dimmed-200)',
		},
		'&.MuiSkeleton-wave::after': {
			animation: 'MuiSkeleton-keyframes-wave 1s linear 0.5s infinite',
			background:
				'linear-gradient(80deg, transparent, rgba(0, 0, 0, 0.2), transparent)',
		},
	},
})

export default function ProfileAttachmentSkeleton() {
	const classes = useStyles()

	return (
		<AttachmentWrapper>
			<Skeleton
				animation="wave"
				height={20}
				width="20%"
				className={classes.root}
			/>

			<Skeleton
				animation="wave"
				height={20}
				width="20%"
				className={classes.root}
			/>

			<Skeleton
				animation="wave"
				height={20}
				width="20%"
				className={classes.root}
			/>

			<Skeleton
				animation="wave"
				height={20}
				width="20%"
				className={classes.root}
			/>
		</AttachmentWrapper>
	)
}

const AttachmentWrapper = styled.div`
	padding: 22px 0px;
	width: 100%;
	flex-flow: row wrap;
	display: flex;
	gap: 5%;
	align-items: center;
	justify-content: flex-start;

	// how mobile should behave
	@media (max-width: 600px) {
		padding: 18px 0px;
		justify-content: space-evenly;
		gap: 0;
	}
`
