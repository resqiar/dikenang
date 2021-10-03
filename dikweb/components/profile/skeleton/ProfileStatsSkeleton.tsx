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

export default function ProfileStatsSkeleton() {
	const classes = useStyles()

	return (
		<BodyWrapper>
			<Skeleton
				animation="wave"
				height={20}
				width="100%"
				className={classes.root}
			/>

			<Skeleton
				animation="wave"
				height={20}
				width="100%"
				className={classes.root}
			/>

			<Skeleton
				animation="wave"
				height={20}
				width="100%"
				className={classes.root}
			/>
		</BodyWrapper>
	)
}

const BodyWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 8px;
	gap: 4px;
`
