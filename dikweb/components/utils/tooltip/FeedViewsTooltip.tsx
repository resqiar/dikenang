import { ReactElement, Fragment } from 'react'

import InfoIconOutlined from '@material-ui/icons/InfoOutlined'
import { Tooltip, withStyles } from '@material-ui/core'
import Icons from '../../icons/Icons'
import styled from 'styled-components'

interface Props {
	children: ReactElement
}

const HtmlTooltip = withStyles(() => ({
	tooltip: {
		backgroundColor: 'var(--background-dimmed-300)',
		color: 'var(--font-white-800)',
		width: 'minimal-content',
		display: 'flex',
		alignItems: 'center',
		gap: '4px',
		padding: '8px',
		fontSize: '12px',
	},
}))(Tooltip)

export default function FeedViewsTooltip(props: Props) {
	return (
		<HtmlTooltip
			arrow
			title={
				<Fragment>
					<Icons
						Icon={InfoIconOutlined}
						color="var(--font-white-800)"
						hasIconButton={false}
					/>

					<TooltipText>
						Dikenang counts post views when the content is displayed
						in someone's feed.
					</TooltipText>
				</Fragment>
			}
		>
			{props.children}
		</HtmlTooltip>
	)
}

const TooltipText = styled.p``
