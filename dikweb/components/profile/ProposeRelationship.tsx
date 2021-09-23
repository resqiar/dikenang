import styled from 'styled-components'
import Card from '../card/Card'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDove, faBan } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'

import CreateIcon from '@material-ui/icons/Create'

export default function ProposeRelationship() {
	return (
		<Wrapper>
			<Card bgColor="var(--background-dimmed-500)">
				<TextWrapper>
					<TextHeaderElement>Propose Relationship</TextHeaderElement>
					<TextSubElement>
						Want to confess? let the dove sent your letter!
					</TextSubElement>

					<IconWrapper>
						<FontAwesomeIcon
							style={{ width: '80px', height: '80px' }}
							icon={faDove}
						/>
					</IconWrapper>

					<ProposeButtonWrapper>
						<ProposeButton
							variant="contained"
							fullWidth={true}
							startIcon={
								<CreateIcon style={{ marginTop: '-2px' }} />
							}
						>
							Write a letter
						</ProposeButton>
					</ProposeButtonWrapper>
				</TextWrapper>
			</Card>

			{/* 
			<Card bgColor="var(--background-dimmed-500)">
				<TextWrapper>
					<TextHeaderElement>Propose Unavailable</TextHeaderElement>
					<TextSubElement>
						This user already has relationship or not available for
						connection.
					</TextSubElement>

					<IconWrapper>
						<FontAwesomeIcon
							style={{ width: '80px', height: '80px' }}
							icon={faBan}
						/>
					</IconWrapper>
				</TextWrapper>
			</Card> */}
		</Wrapper>
	)
}
const Wrapper = styled.div``
const TextWrapper = styled.div`
	padding: 8px;
`
const TextHeaderElement = styled.p`
	color: var(--font-white-700);
	font-weight: bold;
	font-size: 14px;
	padding: 2px;
`
const TextSubElement = styled.p`
	color: var(--font-white-700);
	font-size: 12px;
	padding: 2px;
`
const IconWrapper = styled.div`
	display: flex;
	padding: 18px 8px;
	color: var(--font-white-600);
	align-items: center;
	justify-content: center;
`

const ProposeButtonWrapper = styled.div`
	padding: 8px 24px;
`

const ProposeButton = styled(Button)`
	background: var(--color-primary);
	border-radius: 20px;
	padding: 2px 0px;
	color: var(--font-white);
	font-family: var(--font-family);
	font-weight: bold;
	text-transform: none;
	font-size: 14px;

	&:hover {
		background: purple;
	}
`
