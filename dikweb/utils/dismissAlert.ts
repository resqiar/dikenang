import { Dispatch, SetStateAction } from 'react'

interface Props {
	setHook: Dispatch<SetStateAction<boolean>>
}

export default function dismissAlert(props: Props) {
	localStorage.setItem('alert:beta-test', 'dismissed')
	props.setHook(false)
}
