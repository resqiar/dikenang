import { IconButton } from '@material-ui/core'
import styles from './Icons.module.css'

type props = {
	Icon: React.ElementType
	color?: string
	size?: string
	hasIconButton: boolean
}

export default function Icons({ Icon, color, hasIconButton }: props) {
	return (
		<div className={styles.iconWrapper}>
			{hasIconButton ? (
				<IconButton>
					<Icon style={{ color: color ? color : '#545b5f' }} />
				</IconButton>
			) : (
				<Icon style={{ color: color ? color : '#545b5f' }} />
			)}
		</div>
	)
}
