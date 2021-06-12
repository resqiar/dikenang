import { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import Icons from '../icons/Icons'

interface Props {
	hasIcon?: boolean
	Icon?: React.ElementType
	type: string
	placeholder: string
	iconColor?: string
	focusedIconColor?: string
	isDismissedOnBlur?: boolean
	hasShadow?: boolean
}

export default function Input(props: Props) {
	/**
	 * UseState to determine if input is focused or not.
	 * This is useful to create a great visual representation
	 * of what is going on to the user.
	 */
	const [isMyInputFocused, setIsMyInputFocused] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<InputFieldWrapper hasShadow={props.hasShadow ? true : false}>
			{props.hasIcon ? (
				<InputFieldIcon>
					<Icons
						Icon={props.Icon as any}
						hasIconButton={false}
						color={
							isMyInputFocused
								? props.focusedIconColor
								: props.iconColor
						}
					/>
				</InputFieldIcon>
			) : null}
			<InputElement
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
			/>
		</InputFieldWrapper>
	)
}

const InputFieldWrapper = styled.div<{ hasShadow?: boolean }>`
	display: flex;
	align-items: center;
	margin: 0px 8px;
	background: var(--background-dimmed-300);
	border-radius: 8px;

	/* If props has a shadow */
	${(props) =>
		props.hasShadow &&
		css`
			box-shadow: var(--box-shadow);
		`}
`

const InputFieldIcon = styled.div`
	padding: 3px 4px 2px 8px;
	margin-bottom: -2px;
`

const InputElement = styled.input`
	font-family: var(--font-family);
	width: 100%;
	font-size: 14px;
	font-weight: 300;
	color: var(--font-white-800);
	background: transparent;
	border: none;
	padding: 9px;
	outline: none;
`
