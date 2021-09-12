import styled from 'styled-components'
import Card from '../card/Card'

import Skeleton from '@material-ui/lab/Skeleton'
import Avatar from '@material-ui/core/Avatar'

export default function SidebarSkeleton() {
	return (
		<Card bgColor="var(--background-dimmed-500)">
			<HeaderWrapper>
				<Skeleton variant="rect" animation="wave" width="100%">
					<ImageMockup />
				</Skeleton>

				<TextWrapper>
					<Skeleton width="100%" animation="wave" />
					<Skeleton width="100%" animation="wave" />
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
