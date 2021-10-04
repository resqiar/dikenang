import { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Card from '../card/Card'
import { ProfileDetailProps } from '../../pages/[username]'

import { Chip, Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { useGetUserBadgeQuery } from '../../generated/graphql'

interface Props {
	profileDetail: ProfileDetailProps
}

export default function ProfileDetails(props: Props) {
	/**
	 * This ref attached to Greeting Letter
	 * which will has dynamic height based on
	 * what have been written by user
	 */
	const greetingLetterRef = useRef()
	/**
	 * This hook is used to determine if
	 * it has height more than 350px,
	 * if yes, truncate will be true and vise versa.
	 * Default value is false
	 */
	const [truncate, setTruncate] = useState<boolean>(false)

	useLayoutEffect(() => {
		/**
		 * When component mounted,
		 * Check if letter component has height
		 * More than 200px, if yes truncate and show "Read More" button
		 */
		if (greetingLetterRef.current) {
			// @ts-ignore considering this next line will always be defined
			if (greetingLetterRef.current.clientHeight >= 300) {
				setTruncate(true)
			}
		}
	}, [])

	/**
	 * Query user badges from graphql resolver
	 * return an array of badge
	 */
	const userBadges = useGetUserBadgeQuery({
		variables: {
			username: props.profileDetail.username,
		},
	})

	return (
		<Card bgColor="var(--background-dimmed-500)">
			{/* Badges */}
			<BadgesWrapper>
				<BadgesLabelWrapper>
					<BadgesLabel>Badges Earned</BadgesLabel>
				</BadgesLabelWrapper>

				{userBadges.data?.user.badges &&
				userBadges.data.user.badges.length > 0 ? (
					<BadgesListWrapper>
						{userBadges.data.user.badges.map((value) => (
							<TooltipElement
								title={
									value.description ??
									'No description available'
								}
								arrow
							>
								<BadgesElement
									label={value.label as string | undefined}
									variant={
										value.variant as
											| 'default'
											| 'outlined'
											| undefined
									}
									size="small"
									fontcolor={
										value.color as string | undefined
									}
									background={
										value.background as string | undefined
									}
									bordercolor={
										value.border as string | undefined
									}
								/>
							</TooltipElement>
						))}
					</BadgesListWrapper>
				) : (
					<BadgesNotFound>No badge collected yet</BadgesNotFound>
				)}
			</BadgesWrapper>

			{/* Greeting Letter */}
			<GreetingWrapper>
				<GreetingHeaderText>Greeting Letter</GreetingHeaderText>
				<GreetingLetterBody
					ref={greetingLetterRef}
					isTruncated={truncate}
				>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Ratione dolor quam molestias, soluta exercitationem corrupti
					quasi perferendis necessitatibus placeat eaque illum porro
					labore expedita tenetur incidunt quaerat aut ad ab quos,
					ullam eligendi iste! Laboriosam quia ab harum vitae placeat
					nobis alias vero sed nulla aspernatur? Exercitationem
					nostrum velit autem, corporis molestias cumque, minima
					aspernatur, eligendi deleniti impedit numquam molestiae quod
					vero ullam neque vitae reprehenderit hic consequuntur
					accusantium at optio? Voluptates consequuntur quisquam
					facilis dolorum! Labore placeat libero, reiciendis,
					voluptatum saepe doloribus voluptatem dolorum eveniet,
					<br />
					<br />
					quaerat est aut commodi amet quia doloremque id aliquid
					aspernatur? Corporis et repellendus itaque iusto aspernatur!
					Voluptas dolores mollitia dolorum debitis fugit, voluptate
					magnam aperiam suscipit distinctio doloremque consequuntur
					quam excepturi recusandae deserunt dicta beatae at quod
					iusto atque vel, reiciendis id? Facilis quia numquam
					corrupti? Ullam mollitia fuga dignissimos dolore tempora
					veniam exercitationem reprehenderit doloremque laborum
					beatae, tempore porro sunt in quaerat incidunt provident.
					Facere assumenda cumque aliquid pariatur. Hic delectus,
					cupiditate, est dignissimos tempore asperiores perferendis
					debitis quae praesentium cumque sapiente, placeat ducimus
					omnis illo aperiam necessitatibus officiis reprehenderit
					quod. Reiciendis voluptate sed id ab molestias mollitia ad
					culpa, consectetur odit consequatur sint ullam velit vitae
					corrupti doloribus tenetur laboriosam aliquid excepturi
					libero quo. In sed repellat nisi ad reiciendis neque at non
					voluptas debitis explicabo distincti.
				</GreetingLetterBody>
				{truncate ? (
					<ReadMoreElement onClick={() => setTruncate(false)}>
						READ MORE
					</ReadMoreElement>
				) : undefined}
			</GreetingWrapper>
		</Card>
	)
}

const BadgesWrapper = styled.div`
	padding: 18px 8px 2px 8px;
`
const BadgesLabelWrapper = styled.div``
const BadgesLabel = styled.p`
	color: var(--font-white-800);
	font-size: 18px;
	font-weight: bold;
	text-align: start;
	padding: 0px 18px;
`
const BadgesListWrapper = styled.div`
	display: flex;
	gap: 4px;
	padding: 18px 0px 0px 18px;
`
const GreetingWrapper = styled.div`
	padding: 18px 8px;
`
const GreetingHeaderText = styled.p`
	color: var(--font-white-800);
	font-size: 18px;
	font-weight: bold;
	text-align: start;
	padding: 0px 18px;
`
const GreetingLetterBody = styled.p<{ ref?: any; isTruncated?: boolean }>`
	padding: 18px;
	color: var(--font-white-500);
	text-align: justify;
	max-height: ${(props) => (props.isTruncated ? '100px' : '100%')};
	position: relative;
	overflow: hidden;
`
const BadgesElement = styled(Chip)<{
	fontcolor?: string
	background?: string
	bordercolor?: string
}>`
	cursor: pointer;
	color: ${(props) => props.fontcolor || undefined};
	background: ${(props) => props.background || undefined};
	border-color: ${(props) => props.bordercolor || undefined};
`

const TooltipElement = withStyles(() => ({
	tooltip: {
		color: 'var(--font-white-800)',
		fontSize: 12,
		backgroundColor: 'var(--background-dimmed-200)',
	},
}))(Tooltip)

const ReadMoreElement = styled.p`
	color: var(--font-white-600);
	font-weight: bold;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`

const BadgesNotFound = styled.p`
	color: var(--font-white-600);
	font-size: 13px;
	text-align: start;
	padding: 8px 0px 0px 18px;
`
