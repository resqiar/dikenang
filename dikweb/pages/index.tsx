import Header from '../components/header/Header'
import Head from 'next/head'
import Meta from '../components/meta/Meta'

export default function Home() {
	return (
		<div>
			{/* Default Head Meta Property */}
			<Meta />

			{/* Header Component */}
			<Header />
		</div>
	)
}
