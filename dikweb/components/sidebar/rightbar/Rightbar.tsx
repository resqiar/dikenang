import SidebarCard from '../container/SidebarCard'
import styles from './Rightbar.module.css'

export default function Rightbar() {
	return (
		<div className={styles.rightbarWrapper}>
			{/* Card */}
			<SidebarCard />
		</div>
	)
}
