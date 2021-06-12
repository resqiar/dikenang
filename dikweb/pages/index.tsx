import { GetStaticProps } from 'next'
import IndexBody from '../components/body/IndexBody'
import Header from '../components/header/Header'
import Meta from '../components/meta/Meta'
import { DummyPostType } from '../types/dummypost.type'
import { dummy } from './api/dummy/dummy'

interface Props {
	posts: DummyPostType
}

export const getStaticProps: GetStaticProps = async () => {
	/**
	 * Get static data from dummy
	 * @see './api/dummy/dummy'
	 */
	const posts = dummy
	return { props: { posts } }
}

export default function Home({ posts }: Props) {
	return (
		<div>
			{/* Default Head Meta Property */}
			<Meta title="Dashboard — dikenang" />

			{/* Header Component */}
			<Header />

			{/* Body Component */}
			<IndexBody posts={posts} />
		</div>
	)
}
