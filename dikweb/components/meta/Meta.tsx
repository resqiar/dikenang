import Head from 'next/head'

type props = {
	title?: string
}

export default function Meta({ title }: props) {
	return (
		<Head>
			<title>{title ? title : 'dikenang.'}</title>
			<meta
				name="description"
				content="Keep your memories alive with dikenang."
			/>
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
