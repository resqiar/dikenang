import { useState } from 'react'
import styled from 'styled-components'
import Card from '../card/Card'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDove } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import ProposeDialog from './ProposeDialog'

export default function ProposeRelationship() {
	const [openDialog, setOpenDialog] = useState<boolean>(false)

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
							style={{ width: '100%', height: '100%' }}
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
							onClick={() => setOpenDialog(true)}
						>
							Write a letter
						</ProposeButton>

						{/* Propose Dialog */}
						<ProposeDialog
							onOpen={openDialog}
							onCloseCallback={() => setOpenDialog(false)}
							onSubmitCallback={() => setOpenDialog(false)}
						/>
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

	@media (max-width: 600px) {
		font-size: 18px;
	}
`
const TextSubElement = styled.p`
	color: var(--font-white-700);
	font-size: 12px;
	padding: 2px;

	@media (max-width: 600px) {
		font-size: 16px;
	}
`
const IconWrapper = styled.div`
	display: flex;
	color: var(--font-white-600);
	align-items: center;
	justify-content: center;
	margin: 34px;

	@media (max-width: 600px) {
		margin: 48px;
	}
`

const ProposeButtonWrapper = styled.div`
	padding: 8px 24px;

	@media (max-width: 600px) {
		padding: 8px 48px;
	}
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

	@media (max-width: 600px) {
		padding: 6px 0px;
		font-size: 16px;
	}
`
