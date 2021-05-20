import Icons from '../icons/Icons'
import DikenangLogo from '../logo/DikenangLogo'
import styles from './Header.module.css'

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
				<div className={styles.headerSearchInput}>
					<Input
						placeholder="Search for memories, partners, and stuff"
						type="text"
						hasIcon={true}
						iconColor="grey"
						focusedIconColor="var(--font-white-800)"
						Icon={SearchOutlined}
						// value will dismissed when onBlur
						isDismissedOnBlur={true}
					/>
				</div>
			</div>

			{/* Right Side */}
			<div className={styles.headerIconWrapper}>
				<div className={styles.headerIconList}>
					{/* Mockup for now, future works will replace the following */}
					<Icons Icon={FavoriteBorder} color="purple" hasIconButton />
					<Icons Icon={ChatOutlined} hasIconButton />
					<Icons Icon={NotificationsActiveOutlined} hasIconButton />
				</div>

				<div className={styles.headerAvatarIconWrapper}>
					{/* Avatar Icon */}
					<IconButton>
						<Avatar className={styles.headerAvatarIcon} />
					</IconButton>
				</div>
			</div>
		</div>
	)
}
