import { ReactElement } from 'react'
import { makeStyles, Modal } from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

interface Props {
	ariaLabel?: string
	ariaDescribe?: string
	onOpenCallback: boolean
	onCloseCallback: () => void
	children: ReactElement
}

/** Material UI styles */
const useStyles = makeStyles(() => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}))

export default function ModalDialog({
	ariaLabel,
	ariaDescribe,
	onOpenCallback,
	onCloseCallback,
	children,
}: Props) {
	/** Material UI styles */
	const styles = useStyles()

	return (
		<Modal
			aria-labelledby={ariaLabel ? ariaLabel : 'modal-title'}
			aria-describedby={ariaDescribe ? ariaDescribe : 'modal-description'}
			className={styles.modal}
			open={onOpenCallback}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
			onClose={onCloseCallback}
		>
			<Fade in={onOpenCallback}>{children}</Fade>
		</Modal>
	)
}
