import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

import Skeleton from '@material-ui/lab/Skeleton'
import Avatar from '@material-ui/core/Avatar'
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

export default function FeedPostSkeleton() {
	// React-spring fade animation hook
	const fade = useSpring({ from: { opacity: 0 }, opacity: 1 })
	// material ui styles
	const classes = useStyles()

	return (
		<FeedPostSkeletonWrapper style={fade}>
			<FeedPostHeaderSkeletonWrapper>
				<FeedPostSkeletonProfile>
					<Skeleton
						variant="rect"
						animation="wave"
						className={classes.root}
					>
						<Avatar />
					</Skeleton>

					<FeedPostHeaderSkeletonText>
						<Skeleton
							animation="wave"
							width="80%"
							className={classes.root}
						/>
						<Skeleton
							animation="wave"
							width="20%"
							className={classes.root}
						/>
					</FeedPostHeaderSkeletonText>
				</FeedPostSkeletonProfile>
			</FeedPostHeaderSkeletonWrapper>

			<FeedPostSkeletonBody>
				<FeedPostSkeletonCaption>
					<Skeleton
						animation="wave"
						width="100%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						width="100%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						width="100%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						width="100%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						width="100%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						width="100%"
						className={classes.root}
					/>
					<Skeleton
						animation="wave"
						width="100%"
						className={classes.root}
					/>
				</FeedPostSkeletonCaption>
				<FeedPostSkeletonAttachments>
					<Skeleton
						variant="rect"
						width="100%"
						animation="wave"
						className={classes.root}
					>
						<div style={{ paddingTop: '57%' }} />
					</Skeleton>
				</FeedPostSkeletonAttachments>
			</FeedPostSkeletonBody>
		</FeedPostSkeletonWrapper>
	)
}

const FeedPostSkeletonWrapper = styled(animated.div)`
	background-color: var(--background-dimmed-500);
	height: fit-content;
	border-radius: 8px;
	margin-top: 8px;
	width: 100%;
	box-shadow: var(--box-shadow);

	/* How mobile should behave */
	@media (max-width: 600px) {
		border-radius: 2px;
		margin-top: 4px;
	}
`
const FeedPostHeaderSkeletonWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 18px;
	justify-content: space-between;
	width: 100%;
`
const FeedPostHeaderSkeletonText = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`
const FeedPostSkeletonProfile = styled.div`
	gap: 8px;
	display: flex;
	align-items: center;
	width: 100%;
`

/**
 * Body
 */
const FeedPostSkeletonBody = styled.div``
const FeedPostSkeletonCaption = styled.p`
	word-break: break-word;
	white-space: pre-wrap;
	color: var(--font-white-800);
	font-size: 14px;
	padding: 4px 18px;
	text-align: justify;
	line-height: 18px;
	font-weight: 400;
`
const FeedPostSkeletonAttachments = styled.div`
	width: 100%;
	height: 100%;
	object-fit: cover;
	padding-top: 8px;
`
