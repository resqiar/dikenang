import SidebarCard from '../container/SidebarCard'
import styles from './Leftbar.module.css'

export default function Leftbar() {
	return (
		<div className={styles.leftbarWrapper}>
			{/* Card */}
			<SidebarCard />
		</div>
	)
}
