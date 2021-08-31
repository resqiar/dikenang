/**
 * This package below will only be a mockup (not permanent)
 * Zyphon will replace this package below
 * @see https://github.com/resqiar/Zyphon
 * for more info about new package
 */
// @ts-ignore
import ImgsViewer from 'react-images-viewer'

interface Props {
	imgs: [
		{
			src: string
		}
	]
	open: boolean
	onCloseCallback: () => void
}

export default function Viewer(props: Props) {
	return (
		<ImgsViewer
			imgs={props.imgs}
			isOpen={props.open}
			showThumbnails={true}
			backdropCloseable={true}
			onClose={() => props.onCloseCallback()}
		/>
	)
}
