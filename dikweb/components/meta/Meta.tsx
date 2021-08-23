import Head from 'next/head'

type props = {
	title?: string
	description?: string
	imageURL?: string
}

export default function Meta(props: props) {
	return (
		<Head>
			<title>{props.title ? props.title : 'Dikenang'}</title>

			{/* <!-- Primary Meta Tags --> */}
			<meta
				name="title"
				content={
					props.title
						? props.title
						: 'Dikenang — Keep your memories alive, forever 🌺'
				}
			></meta>
			<meta
				name="description"
				content={
					props.description
						? props.description
						: 'Share everything; images, videos, stories, memories, and more!'
				}
			></meta>

			{/* <!-- Open Graph / Facebook --> */}
			<meta property="og:type" content="website"></meta>
			<meta property="og:url" content=""></meta>
			<meta
				property="og:title"
				content={
					props.title
						? props.title
						: 'Dikenang — Keep your memories alive, forever 🌺'
				}
			></meta>
			<meta
				property="og:description"
				content={
					props.description
						? props.description
						: 'Share everything; images, videos, stories, memories, and more!'
				}
			></meta>
			<meta
				property="og:image"
				content={props.imageURL ? props.imageURL : '/dikenang-logo.png'}
			></meta>

			{/* <!-- Twitter --> */}
			<meta property="twitter:card" content="summary_large_image"></meta>
			<meta property="twitter:url" content=""></meta>
			<meta
				property="twitter:title"
				content={
					props.title
						? props.title
						: 'Dikenang — Keep your memories alive, forever 🌺'
				}
			></meta>
			<meta
				property="twitter:description"
				content={
					props.description
						? props.description
						: 'Share everything; images, videos, stories, memories, and more!'
				}
			></meta>
			<meta
				property="twitter:image"
				content={props.imageURL ? props.imageURL : '/dikenang-logo.png'}
			></meta>

			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/apple-touch-icon.png"
			></link>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon-32x32.png"
			></link>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon-16x16.png"
			></link>

			<link rel="manifest" href="/manifest.json"></link>
		</Head>
	)
}
