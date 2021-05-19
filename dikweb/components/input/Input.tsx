import Icons from '../icons/Icons'
import styles from './Input.module.css'

type props = {
	hasIcon?: boolean
	Icon?: React.ElementType
	type: string
	placeholder: string
}

export default function Input(props: props) {
	return (
		<div className={styles.inputField}>
			{props.hasIcon ? (
				<div className={styles.inputFieldIcon}>
					<Icons Icon={props.Icon as any} hasIconButton={false} />
				</div>
			) : null}
			<input type={props.type} placeholder={props.placeholder} />
		</div>
	)
}
