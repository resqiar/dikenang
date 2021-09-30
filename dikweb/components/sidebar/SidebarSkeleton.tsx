import styled from 'styled-components'
import Card from '../card/Card'

import Skeleton from '@material-ui/lab/Skeleton'
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

export default function SidebarSkeleton() {
	const classes = useStyles()

	return (
		<Card bgColor="var(--background-dimmed-500)">
			<HeaderWrapper>
				<Skeleton
					variant="rect"
					animation="wave"
					width="100%"
					className={classes.root}
				>
					<ImageMockup />
				</Skeleton>

				<TextWrapper>
					<Skeleton
						width="100%"
						animation="wave"
						className={classes.root}
					/>
					<Skeleton
						width="100%"
						animation="wave"
						className={classes.root}
					/>
				</TextWrapper>
			</HeaderWrapper>
		</Card>
	)
}

const HeaderWrapper = styled.div`
	height: min-content;
	width: 100%;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
`

const ImageMockup = styled.div`
	height: 90px;
`

const TextWrapper = styled.div`
	width: 100%;
	padding: 18px;
`
