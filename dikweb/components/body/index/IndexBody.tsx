import Leftbar from '../../sidebar/leftbar/Leftbar'
import Rightbar from '../../sidebar/rightbar/Rightbar'
import styles from './IndexBody.module.css'

export default function IndexBody() {
	return (
		<div className={styles.indexBody}>
			{/* Sidebar => Left */}
			<Leftbar />

			{/* Post => Middle */}
			<div className={styles.indexBodyMidWrapper}></div>

			{/* Sidebar => Right */}
			<Rightbar />
		</div>
	)
}
