import Icons from '../icons/Icons'
import DikenangLogo from '../logo/DikenangLogo'
import styles from './Header.module.css'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import {
	SearchOutlined,
	ChatOutlined,
	FavoriteBorder,
	NotificationsActiveOutlined,
} from '@material-ui/icons'
import Input from '../input/Input'
import { Avatar, IconButton } from '@material-ui/core'

export default function Header() {
	return (
		<div className={styles.header}>
			{/* Left Side */}
			<div className={styles.headerBrand}>
				{/* Brand Logo */}
				<DikenangLogo />

				{/* Search Component */}
				<Input
					placeholder="Search anything..."
					type="text"
					hasIcon={true}
					Icon={SearchOutlined}
				/>
			</div>

			{/* Right Side */}
			<div className={styles.navList}>
				{/* Mockup for now, future works will replace the following */}
				<Icons Icon={FavoriteBorder} color="purple" hasIconButton />
				<Icons Icon={ChatOutlined} hasIconButton />
				<Icons Icon={NotificationsActiveOutlined} hasIconButton />
				{/* Avatar Icon */}
				<IconButton>
					<Avatar className={styles.headerAvatarIcon} />
				</IconButton>
			</div>
		</div>
	)
}
