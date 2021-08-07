export default function scrollToBottom(elementRef: any) {
	elementRef.current?.addEventListener('DOMNodeInserted', (event: any) => {
		const { currentTarget: target } = event
		target.scroll({
			top: target.scrollHeight,
			behavior: 'smooth',
		})
	})
}
