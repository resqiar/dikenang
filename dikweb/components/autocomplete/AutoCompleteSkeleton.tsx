import styled from 'styled-components'
import { animated } from 'react-spring'

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

export default function AutoCompleteSkeleton() {
	const classes = useStyles()

	return (
		<AutoCompleteItemWrapper>
			<ItemWrapper>
				<Skeleton
					animation="wave"
					height={15}
					width="20%"
					className={classes.root}
				/>
				<ContentWrapper>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="20%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="30%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="50%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="40%"
						className={classes.root}
					/>
				</ContentWrapper>
				<ContentWrapper>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="50%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="20%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="60%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="20%"
						className={classes.root}
					/>
				</ContentWrapper>
			</ItemWrapper>

			<ItemWrapper>
				<Skeleton
					animation="wave"
					height={15}
					width="20%"
					className={classes.root}
				/>
				<ContentWrapper>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="20%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="30%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="50%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="40%"
						className={classes.root}
					/>
				</ContentWrapper>
				<ContentWrapper>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="50%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="20%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="60%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						height={15}
						variant="rect"
						width="20%"
						className={classes.root}
					/>
				</ContentWrapper>
			</ItemWrapper>
		</AutoCompleteItemWrapper>
	)
}

const AutoCompleteItemWrapper = styled(animated.div)`
	position: absolute;
	top: 10;
	right: 0;
	left: 0;
	z-index: 999999;
	margin: 0px 5%;
	padding: 12px 18px;
	border: var(--border);
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;
	box-shadow: var(--box-shadow);
	background: var(--background-dimmed-500);
`

const ItemWrapper = styled.div`
	margin-bottom: 18px;
`
const ContentWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin: 8px;
`
