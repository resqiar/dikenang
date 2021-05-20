import { useRef, useState } from 'react'
import Icons from '../icons/Icons'
import styles from './Input.module.css'

type props = {
	hasIcon?: boolean
	Icon?: React.ElementType
	type: string
	placeholder: string
	iconColor?: string
	focusedIconColor?: string
	isDismissedOnBlur?: boolean
}

export default function Input(props: props) {
	/**
	 * UseState to determine if input is focused or not.
	 * This is useful to create a great visual representation
	 * of what is going on to the user.
	 */
	const [isMyInputFocused, setIsMyInputFocused] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<div className={styles.inputField}>
			{props.hasIcon ? (
				<div className={styles.inputFieldIcon}>
					<Icons
						Icon={props.Icon as any}
						hasIconButton={false}
						color={
							isMyInputFocused
								? props.focusedIconColor
								: props.iconColor
						}
					/>
				</div>
			) : null}
			<input
				key="inputField"
				type={props.type}
				ref={inputRef}
				placeholder={props.placeholder}
				onFocus={() => setIsMyInputFocused(true)}
				onBlur={() => {
					// Reset focus state
					setIsMyInputFocused(false)

					// If set dismiss onBlur => delete value onBlur
					if (props.isDismissedOnBlur) {
						// If current value is null => ignore
						if (inputRef.current !== null) {
							inputRef.current.value = ''
						}
					}
				}}
				className={isMyInputFocused ? styles.inputFocused : ''}
			/>
		</div>
	)
}
