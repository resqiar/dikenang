import styled from 'styled-components'
import ModalDialog from '../modal/ModalDialog'
import Button from '../button/Button'

import CircularProgress from '@material-ui/core/CircularProgress'

interface Props {
	onOpenCallback: boolean
	onCloseCallback: () => void
	onSubmitCallback: () => void
	headerText: string
	bodyText?: string
	isLoading?: boolean
	cancelButtonText?: string
	submitButtonText?: string
}

export default function ConfirmationModal(props: Props) {
	return (
		<ModalDialog
			onOpenCallback={props.onOpenCallback}
			onCloseCallback={props.onCloseCallback}
		>
			<ConfirmationDialogWrapper>
				<ConfirmationDialogHeader>
					<ConfirmationDialogHeaderText>
						{props.headerText}
					</ConfirmationDialogHeaderText>
				</ConfirmationDialogHeader>

				<ConfirmationDialogBody>
					<ConfirmationDialogBodyText>
						{props.bodyText}
					</ConfirmationDialogBodyText>
				</ConfirmationDialogBody>

				<ConfirmationDialogFooter>
					<ConfirmationDialogFooterButtonWrapper>
						{props.isLoading ? (
							<CircularProgress
								size={25}
								style={{
									color: 'var(--color-primary)',
								}}
							/>
						) : (
							<>
								{/* CLOSE MODAL */}
								<Button
									onClick={props.onCloseCallback}
									text={
										props.cancelButtonText
											? props.cancelButtonText
											: 'Cancel'
									}
									isUppercase={true}
									type="button"
									fontWeight="600"
									padding="8px"
									border="none"
									bgColor="var(--color-primary)"
									color="var(--font-white-800)"
									borderRadius="20px"
								/>

								{/* SUBMIT */}
								<Button
									onClick={props.onSubmitCallback}
									text={
										props.submitButtonText
											? props.submitButtonText
											: 'Delete'
									}
									isUppercase={true}
									type="button"
									fontWeight="600"
									padding="8px"
									border="none"
									color="red"
									borderRadius="20px"
								/>
							</>
						)}
					</ConfirmationDialogFooterButtonWrapper>
				</ConfirmationDialogFooter>
			</ConfirmationDialogWrapper>
		</ModalDialog>
	)
}

const ConfirmationDialogWrapper = styled.div`
	display: flex;
	border-radius: 8px;
	flex-direction: column;
	height: fit-content;
	width: fit-content;
	background-color: var(--background-dimmed-500);
	padding: 8px;
`
const ConfirmationDialogHeader = styled.div`
	padding: 16px;
	display: flex;
	width: 100%;
	justify-content: center;
`
const ConfirmationDialogHeaderText = styled.p`
	font-weight: bold;
	color: var(--font-white-800);
	font-size: 18px;
`
const ConfirmationDialogBody = styled.div`
	padding: 4px 16px 18px 16px;
`
const ConfirmationDialogBodyText = styled.p`
	color: var(--font-white-600);
`
const ConfirmationDialogFooter = styled.div`
	padding: 8px;
`
const ConfirmationDialogFooterButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	gap: 8px;
`
