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
